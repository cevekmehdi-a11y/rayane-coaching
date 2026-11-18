import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Check, CircleAlert, CircleCheck, Copy, LoaderCircle, PencilLine, Save } from 'lucide-react'
import { currency, googleForm, payment, plans, questions } from '../config'
import { content } from '../content'
import { useLang } from '../lib/i18n'
import { formatNumber, normalizeDigits } from '../lib/format'
import { submitGoogleForm } from '../lib/googleForm'
import { publicUrl } from '../lib/publicUrl'
import { canPrefill, copyText, hasWhatsApp, whatsappHref } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons'

/*
 * Formulaire d'inscription au style Google Forms.
 * À l'envoi, les réponses partent sur le WhatsApp du coach :
 *  - « prefill » : numéro renseigné → WhatsApp s'ouvre avec le message déjà écrit
 *  - « copy »    : seulement le lien QR → le message est copié, le client le colle dans la conversation
 *  - « google »  : aucun WhatsApp mais Google Form activé → envoi dans le Google Form
 * Copie optionnelle dans le Google Form : googleForm.enabled dans src/config.js.
 * En développement, ajoute ?dryrun à l'URL pour simuler l'envoi (rien n'est ouvert ni envoyé).
 */

const DRAFT_KEY = 'rc-signup-draft'
const DRY_RUN = import.meta.env.DEV && new URLSearchParams(window.location.search).has('dryrun')
const MODE = hasWhatsApp ? (canPrefill ? 'prefill' : 'copy') : googleForm.enabled ? 'google' : 'none'

const planOptions = plans.map((p) => ({ value: p.formValue, label: p.label, price: p.price }))
const optionsFor = (q) => (q.type === 'plans' ? planOptions : (q.options ?? []))
const detailKey = (q) => `${q.id}__detail`
const isBlank = (v) => v == null || String(v).trim() === ''
const toNumber = (v) => parseFloat(normalizeDigits(v).replace(',', '.').trim())
/** Taille saisie en mètres (1.78) → convertie en centimètres */
const heightCm = (v) => {
  const n = toNumber(v)
  return n > 0 && n < 3 ? Math.round(n * 100) : n
}

function emptyAnswers() {
  const answers = {}
  for (const q of questions) {
    answers[q.id] = q.type === 'body' ? { weight: '', height: '' } : ''
    if (optionsFor(q).some((o) => o.detail)) answers[detailKey(q)] = ''
  }
  return answers
}

/** Recharge le brouillon en ne gardant que les valeurs encore valides (ex. si un prix a changé) */
function loadDraft() {
  const answers = emptyAnswers()
  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null')
    if (!saved || typeof saved !== 'object') return answers
    for (const q of questions) {
      const v = saved[q.id]
      if (q.type === 'body') {
        if (v && typeof v === 'object') answers[q.id] = { weight: String(v.weight ?? ''), height: String(v.height ?? '') }
      } else if (q.type === 'plans' || q.type === 'radio') {
        if (optionsFor(q).some((o) => o.value === v)) answers[q.id] = v
      } else if (typeof v === 'string') {
        answers[q.id] = v
      }
      const dk = detailKey(q)
      if (dk in answers && typeof saved[dk] === 'string') answers[dk] = saved[dk]
    }
  } catch {
    /* brouillon illisible ou stockage bloqué : on repart de zéro */
  }
  return answers
}

function validate(q, answers) {
  const value = answers[q.id]
  if (q.type === 'body') {
    if (isBlank(value.weight) && isBlank(value.height)) return q.required ? 'required' : null
    const w = toNumber(value.weight)
    const h = heightCm(value.height)
    return w >= 25 && w <= 300 && h >= 100 && h <= 250 ? null : 'body'
  }
  if (isBlank(value)) return q.required ? 'required' : null
  const v = normalizeDigits(value).trim()
  if (q.type === 'tel' && !/^\+?\d{8,15}$/.test(v.replace(/[\s.\-()/]/g, ''))) return 'phone'
  if (q.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'email'
  if (q.type === 'age') {
    const n = Number(v)
    if (!Number.isInteger(n) || n < 10 || n > 99) return 'age'
  }
  return null
}

/** Message WhatsApp envoyé au coach, dans la langue choisie par le client */
function buildMessage(answers, t, lang) {
  const f = content.form
  const lines = []
  // « Formule : » en français (espace avant les deux-points), « الباقة: » en arabe
  const colon = lang === 'fr' ? ' :' : ':'
  for (const q of questions) {
    const value = answers[q.id]
    let text = ''
    if (q.type === 'body') {
      if (!isBlank(value.weight)) {
        text = `${toNumber(value.weight)} ${t(f.units.kg)} / ${heightCm(value.height)} ${t(f.units.cm)}`
      }
    } else if (q.type === 'plans') {
      const plan = plans.find((p) => p.formValue === value)
      if (plan) text = `${t(plan.label)} — ${formatNumber(plan.price)} ${currency}`
    } else if (q.type === 'radio') {
      const option = optionsFor(q).find((o) => o.value === value)
      if (option) {
        const detail = String(answers[detailKey(q)] ?? '').trim()
        // `message` = formulation à la voix du client pour le message (sinon le libellé du formulaire)
        const label = t(option.message ?? option.label)
        text = option.detail && detail ? `${label} (${detail})` : label
      }
    } else if (q.type === 'age') {
      if (!isBlank(value)) text = `${normalizeDigits(value).trim()} ${t(f.units.years)}`
    } else if (q.type === 'tel') {
      text = normalizeDigits(value).trim()
    } else {
      text = String(value ?? '').trim()
    }
    if (text) lines.push(`${q.emoji ? `${q.emoji} ` : ''}*${t(q.short ?? q.label)}${colon}* ${text}`)
  }
  return `${t(f.message.intro)}\n\n${lines.join('\n')}`
}

/** Champs pour le Google Form (copie optionnelle) — toujours en arabe, comme les réponses actuelles du coach */
function buildFields(answers) {
  const fields = {}
  const notes = []
  for (const q of questions) {
    const value = answers[q.id]
    let out
    if (q.type === 'body') {
      out = isBlank(value.weight) ? '' : `الوزن: ${toNumber(value.weight)} كغ — الطول: ${heightCm(value.height)} سم`
    } else if (q.type === 'tel' || q.type === 'age') {
      out = normalizeDigits(value).trim()
    } else {
      out = String(value ?? '').trim()
    }
    fields[q.entry] = out

    const selected = optionsFor(q).find((o) => o.value === value)
    const detail = String(answers[detailKey(q)] ?? '').trim()
    if (selected?.detail && detail) notes.push(`${q.label.ar.trim()}: ${detail}`)
  }
  const target = questions.find((q) => q.collectsNotes)
  if (target && notes.length) fields[target.entry] = [...notes, fields[target.entry]].filter(Boolean).join('\n')
  return fields
}

/* ─────────────────────────────────────────────────────────────── */

function FormBanner() {
  const { t } = useLang()
  const b = content.form.banner
  const [imageFailed, setImageFailed] = useState(false)

  if (googleForm.bannerImage && !imageFailed) {
    return (
      <img
        src={publicUrl(googleForm.bannerImage)}
        alt=""
        onError={() => setImageFailed(true)}
        className="w-full rounded-3xl object-cover"
      />
    )
  }

  // Reprise de la bannière du Google Form du coach : slogan + ses 4 services
  return (
    <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-8 text-white shadow-card sm:px-10 sm:py-10">
      <div aria-hidden="true" className="speed-lines pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1.5 bg-accent-500" />
      <div className="relative flex flex-col gap-6 sm:flex-row-reverse sm:items-center sm:justify-between">
        <p className="slant font-display text-[2.2rem] leading-[1.25] sm:text-[2.8rem]">
          {t(b.line1)}
          <span className="block text-accent-400">{t(b.line2)}</span>
        </p>
        <ul className="flex flex-wrap gap-2 sm:max-w-[13rem] sm:flex-col sm:items-start">
          {b.tags.map((tag, i) => (
            <li key={i} className="rounded-full bg-white/10 px-3.5 py-1.5 font-display text-[15px] leading-none backdrop-blur">
              {t(tag)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function HeaderCard() {
  const { t } = useLang()
  const f = content.form
  return (
    <div className="gf-card border-t-[10px] border-t-accent-500">
      <h2 className="font-display text-[2rem] leading-snug text-ink-900">{t(f.title)}</h2>
      <ol className="mt-4 list-decimal space-y-1.5 ps-5 text-[15px] leading-relaxed text-ink/80 marker:font-bold marker:text-accent-600">
        {f.rules.map((rule, i) => (
          <li key={i}>{t(rule)}</li>
        ))}
      </ol>
      <hr className="-mx-5 my-5 border-paper-300 sm:-mx-7" />
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="font-semibold text-red-700">{t(f.requiredNote)}</span>
        <span className="flex items-center gap-1.5 text-ink/50">
          <Save className="h-4 w-4" />
          {t(f.draftNote)}
        </span>
      </div>
    </div>
  )
}

function AutoTextarea({ value, ...props }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [value])
  return <textarea ref={ref} rows={1} value={value} {...props} />
}

function Question({ q, answers, setAnswer, touch, error, flash }) {
  const { t } = useLang()
  const f = content.form
  const value = answers[q.id]
  const inputId = `q-${q.id}-input`
  const labelId = `q-${q.id}-label`
  const helpId = `q-${q.id}-help`
  const errorId = `q-${q.id}-error`
  const describedBy = [q.help && helpId, error && errorId].filter(Boolean).join(' ') || undefined
  const isGroup = q.type === 'plans' || q.type === 'radio' || q.type === 'body'

  const inputProps = {
    id: inputId,
    value,
    onChange: (e) => setAnswer(q.id, e.target.value),
    onBlur: () => touch(q.id),
    placeholder: t(q.placeholder ?? f.placeholder),
    'aria-invalid': !!error,
    'aria-required': q.required || undefined,
    'aria-describedby': describedBy,
  }

  let field
  switch (q.type) {
    case 'plans':
    case 'radio': {
      const options = optionsFor(q)
      const selected = options.find((o) => o.value === value)
      field = (
        <div
          role="radiogroup"
          aria-labelledby={labelId}
          aria-describedby={describedBy}
          aria-required={q.required || undefined}
          aria-invalid={!!error}
          className="flex flex-col gap-0.5"
        >
          {options.map((opt, i) => {
            const id = `${inputId}-${i}`
            const checked = value === opt.value
            return (
              <label
                key={opt.value}
                htmlFor={id}
                className={`gf-option -mx-2 flex cursor-pointer items-center gap-3.5 rounded-xl px-2 py-2.5 transition-colors hover:bg-paper-100 ${
                  checked ? 'bg-accent-50' : ''
                }`}
              >
                <input
                  id={id}
                  type="radio"
                  name={q.id}
                  value={opt.value}
                  checked={checked}
                  onChange={() => setAnswer(q.id, opt.value)}
                  className="gf-radio"
                />
                <span className="flex-1 text-[15px] leading-snug text-ink/90">{t(opt.label)}</span>
                {opt.price != null && (
                  <bdi dir="ltr" className="whitespace-nowrap text-[15px] font-bold text-accent-700">
                    {formatNumber(opt.price)} {currency}
                  </bdi>
                )}
              </label>
            )
          })}
          {selected?.detail && (
            <div className="ps-8 pt-1">
              <input
                type="text"
                value={answers[detailKey(q)]}
                onChange={(e) => setAnswer(detailKey(q), e.target.value)}
                placeholder={t(selected.detail)}
                aria-label={t(selected.detail)}
                className="gf-input max-w-sm"
              />
            </div>
          )}
        </div>
      )
      break
    }

    case 'body': {
      const parts = [
        { key: 'weight', label: f.weight, unit: f.units.kg, example: '75' },
        { key: 'height', label: f.height, unit: f.units.cm, example: '178' },
      ]
      field = (
        <div
          className="grid max-w-md grid-cols-2 gap-6"
          // Validation au moment où l'on quitte la question entière (pas entre poids et taille)
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && touch(q.id)}
        >
          {parts.map((p) => (
            <div key={p.key}>
              <label htmlFor={`${inputId}-${p.key}`} className="text-xs font-semibold text-ink/55">
                {t(p.label)}
              </label>
              <div className="relative">
                <input
                  id={`${inputId}-${p.key}`}
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  maxLength={6}
                  value={value[p.key]}
                  onChange={(e) => setAnswer(q.id, { ...value, [p.key]: e.target.value })}
                  placeholder={p.example}
                  aria-invalid={!!error}
                  aria-required={q.required || undefined}
                  aria-describedby={describedBy}
                  className="gf-input pe-9"
                />
                <span className="pointer-events-none absolute bottom-2.5 end-0 text-sm text-ink/45">{t(p.unit)}</span>
              </div>
            </div>
          ))}
        </div>
      )
      break
    }

    case 'tel':
      field = <input {...inputProps} type="tel" inputMode="tel" autoComplete="tel" dir="ltr" className="gf-input max-w-sm rtl:text-right" />
      break

    case 'email':
      field = (
        <input
          {...inputProps}
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          dir="ltr"
          className="gf-input max-w-sm rtl:text-right"
        />
      )
      break

    case 'age':
      field = (
        <div className="relative max-w-[10rem]">
          <input {...inputProps} type="text" inputMode="numeric" autoComplete="off" maxLength={3} className="gf-input pe-10" />
          <span className="pointer-events-none absolute bottom-2.5 end-0 text-sm text-ink/45">{t(f.units.years)}</span>
        </div>
      )
      break

    case 'textarea':
      field = <AutoTextarea {...inputProps} className="gf-input resize-none overflow-hidden leading-relaxed" />
      break

    default:
      field = <input {...inputProps} type="text" autoComplete={q.autoComplete ?? 'off'} className="gf-input max-w-md" />
  }

  const LabelTag = isGroup ? 'p' : 'label'

  return (
    <div id={`q-${q.id}`} className={`gf-card ${error ? 'gf-card--error' : ''} ${flash ? 'animate-flash' : ''}`}>
      <LabelTag
        id={labelId}
        {...(isGroup ? {} : { htmlFor: inputId })}
        className="block text-[17px] font-semibold leading-relaxed text-ink"
      >
        {t(q.label)}
        {q.required && (
          <span className="ms-1 text-red-600" aria-hidden="true">
            *
          </span>
        )}
      </LabelTag>
      {q.help && (
        <p id={helpId} className="mt-0.5 text-sm text-ink/55">
          {t(q.help)}
        </p>
      )}
      <div className="mt-4">{field}</div>
      {error && (
        <p id={errorId} className="mt-4 flex items-center gap-2 text-sm text-red-700">
          <CircleAlert className="h-5 w-5 shrink-0" />
          {t(f.errors[error])}
        </p>
      )}
    </div>
  )
}

function SuccessCard({ mode, message, copied: copiedAtSubmit, onEdit, onAgain }) {
  const { t } = useLang()
  const s = content.form.success
  const [copied, setCopied] = useState(copiedAtSubmit)
  const viaWhatsApp = mode === 'prefill' || mode === 'copy'
  const hasPayment = payment.ccp || payment.baridimob
  const title = mode === 'prefill' ? s.prefillTitle : mode === 'copy' ? s.copyTitle : s.sentTitle

  async function handleCopy() {
    setCopied(await copyText(message))
  }

  return (
    <div className="gf-card border-t-[10px] border-t-accent-500" role="status">
      <div className="flex items-start gap-4">
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${
            viaWhatsApp ? 'bg-[#25D366] text-white' : 'bg-accent-100 text-accent-700'
          }`}
        >
          {viaWhatsApp ? <WhatsAppIcon className="h-6 w-6" /> : <CircleCheck className="h-7 w-7" />}
        </span>
        <div>
          <h2 className="text-2xl font-bold leading-snug">{t(title)}</h2>
          {mode === 'prefill' && <p className="mt-1.5 leading-relaxed text-ink/70">{t(s.prefillText)}</p>}
        </div>
      </div>

      {mode === 'copy' && (
        <ol className="mt-5 space-y-2.5">
          {s.copySteps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#25D366]/15 text-sm font-bold text-[#128C7E]">
                {i + 1}
              </span>
              <span className="pt-0.5 leading-relaxed text-ink/80">{t(step)}</span>
            </li>
          ))}
        </ol>
      )}

      {viaWhatsApp && (
        <>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={whatsappHref(message)}
              target="_blank"
              rel="noopener noreferrer"
              // Lien QR : on recopie le message au moment du clic, par sécurité
              onClick={() => mode === 'copy' && copyText(message).then((ok) => ok && setCopied(true))}
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-display font-semibold text-white transition hover:brightness-95"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t(s.open)}
            </a>
            {mode === 'copy' && (
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-3.5 font-display text-sm font-semibold text-ink/80 transition hover:border-ink"
              >
                {copied ? <Check className="h-4 w-4 text-[#128C7E]" strokeWidth={3} /> : <Copy className="h-4 w-4" />}
                {t(copied ? s.copied : s.copy)}
              </button>
            )}
          </div>

          <details className="mt-5 rounded-xl border border-paper-300 bg-paper-50" open={mode === 'copy'}>
            <summary className="cursor-pointer px-4 py-3 text-sm font-bold text-ink/70">{t(s.preview)}</summary>
            <pre dir="auto" className="max-h-72 overflow-auto whitespace-pre-wrap break-words px-4 pb-4 font-sans text-sm leading-relaxed text-ink/80">
              {message}
            </pre>
          </details>
        </>
      )}

      <div className="mt-7 border-t border-paper-300 pt-5">
        <p className="font-bold">{t(s.afterTitle)}</p>
        <ol className="mt-3 space-y-3">
          {s.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-accent-300">{i + 1}</span>
              <span className="pt-0.5 leading-relaxed text-ink/80">{t(step)}</span>
            </li>
          ))}
        </ol>

        {hasPayment && (
          <div className="mt-5 rounded-xl border border-accent-300 bg-accent-50 p-4">
            <p className="font-bold">{t(s.paymentTitle)}</p>
            <dl className="mt-2 space-y-1 text-sm">
              {payment.ccp && (
                <div className="flex flex-wrap gap-2">
                  <dt className="font-semibold">CCP :</dt>
                  <dd dir="ltr" className="font-mono">
                    {payment.ccp}
                  </dd>
                </div>
              )}
              {payment.baridimob && (
                <div className="flex flex-wrap gap-2">
                  <dt className="font-semibold">BaridiMob (RIP) :</dt>
                  <dd dir="ltr" className="font-mono">
                    {payment.baridimob}
                  </dd>
                </div>
              )}
              {payment.holder && (
                <div className="flex flex-wrap gap-2">
                  <dt className="font-semibold">{t(s.holder)} :</dt>
                  <dd>{payment.holder}</dd>
                </div>
              )}
            </dl>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {viaWhatsApp && (
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 font-display text-sm font-semibold text-accent-700 transition hover:bg-accent-50"
          >
            <PencilLine className="h-4 w-4" />
            {t(s.edit)}
          </button>
        )}
        <button
          type="button"
          onClick={onAgain}
          className="rounded-full px-3 py-2 font-display text-sm font-semibold text-accent-700 transition hover:bg-accent-50"
        >
          {t(s.again)}
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────── */

export default function SignupForm({ planRequest }) {
  const { t, lang } = useLang()
  const f = content.form
  const [answers, setAnswers] = useState(loadDraft)
  const [touched, setTouched] = useState({})
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [result, setResult] = useState(null) // { message, copied }
  const [flashPlan, setFlashPlan] = useState(false)
  const sectionRef = useRef(null)
  const honeypotRef = useRef(null)

  const errors = useMemo(() => Object.fromEntries(questions.map((q) => [q.id, validate(q, answers)])), [answers])
  const errorCount = questions.filter((q) => errors[q.id]).length

  // Brouillon gardé sur l'appareil (comme « enregistrer ma progression » sur Google Forms)
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(answers))
    } catch {
      /* stockage indisponible */
    }
  }, [answers])

  // Clic sur « اختر هذه الباقة » dans les tarifs → formule pré-cochée
  useEffect(() => {
    if (!planRequest) return
    const plan = plans.find((p) => p.id === planRequest.planId)
    if (!plan) return
    setAnswers((a) => ({ ...a, plan: plan.formValue }))
    setStatus('idle')
    setFlashPlan(true)
    const timer = setTimeout(() => setFlashPlan(false), 2600)
    return () => clearTimeout(timer)
  }, [planRequest])

  const setAnswer = useCallback((id, value) => {
    setAnswers((a) => ({ ...a, [id]: value }))
    setStatus((s) => (s === 'error' ? 'idle' : s))
  }, [])
  const touch = useCallback((id) => setTouched((tt) => (tt[id] ? tt : { ...tt, [id]: true })), [])

  const scrollToForm = () =>
    requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))

  function reset() {
    setAnswers(emptyAnswers())
    setTouched({})
    setAttempted(false)
    try {
      localStorage.removeItem(DRAFT_KEY)
    } catch {
      /* stockage indisponible */
    }
  }

  function showSuccess(data) {
    setResult(data)
    setStatus('success')
    scrollToForm()
  }

  // ⚠️ Pas d'« await » avant window.open / la copie : le navigateur exige que ça se passe pendant le clic
  function handleSubmit(e) {
    e.preventDefault()
    setAttempted(true)

    const firstError = questions.find((q) => errors[q.id])
    if (firstError) {
      const card = document.getElementById(`q-${firstError.id}`)
      card?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      card?.querySelector('input, textarea')?.focus({ preventScroll: true })
      return
    }

    // Piège anti-robots : ce champ est invisible, un humain ne le remplit jamais
    if (honeypotRef.current?.value) {
      showSuccess({ message: '', copied: false })
      return
    }

    const message = buildMessage(answers, t, lang)

    if (DRY_RUN) {
      console.info(`[dryrun] Mode « ${MODE} » — message WhatsApp :\n${message}`)
      if (hasWhatsApp) console.info('[dryrun] Lien WhatsApp :', whatsappHref(message))
      if (googleForm.enabled) console.info('[dryrun] Copie Google Form :', buildFields(answers))
      showSuccess({ message, copied: MODE === 'copy' })
      return
    }

    if (MODE === 'none') {
      console.error('Aucun WhatsApp ni Google Form configuré dans src/config.js')
      setStatus('error')
      return
    }

    if (MODE === 'prefill') window.open(whatsappHref(message), '_blank', 'noopener')
    const copying = MODE === 'copy' ? copyText(message) : Promise.resolve(false)

    if (googleForm.enabled) {
      const sending = submitGoogleForm(googleForm.action, buildFields(answers))
      if (MODE === 'google') {
        setStatus('sending')
        sending
          .then(() => showSuccess({ message, copied: false }))
          .catch((err) => {
            console.error('Envoi du formulaire impossible', err)
            setStatus('error')
          })
        return
      }
      sending.catch((err) => console.warn('Copie dans le Google Form impossible', err))
    }

    copying.then((copied) => showSuccess({ message, copied }))
  }

  function handleClear() {
    if (!window.confirm(t(f.clearConfirm))) return
    reset()
    setStatus('idle')
  }

  return (
    <section id="signup" ref={sectionRef} className="bg-paper-100 py-16 text-ink-900 sm:py-24">
      <div className="mx-auto w-full max-w-[720px] space-y-3 px-4 sm:px-6">
        <FormBanner />

        {status === 'success' && result ? (
          <SuccessCard
            key={result.message}
            mode={MODE}
            message={result.message}
            copied={result.copied}
            onEdit={() => {
              setStatus('idle')
              scrollToForm()
            }}
            onAgain={() => {
              reset()
              setStatus('idle')
              scrollToForm()
            }}
          />
        ) : (
          <form noValidate onSubmit={handleSubmit} className="space-y-3">
            <HeaderCard />

            {questions.map((q) => (
              <Question
                key={q.id}
                q={q}
                answers={answers}
                setAnswer={setAnswer}
                touch={touch}
                error={attempted || touched[q.id] ? errors[q.id] : null}
                flash={q.type === 'plans' && flashPlan}
              />
            ))}

            {/* Piège anti-robots */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <label>
                Website
                <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {attempted && errorCount > 0 && (
              <p role="alert" className="flex items-center gap-2 px-1 pt-1 text-sm font-semibold text-red-700">
                <CircleAlert className="h-5 w-5 shrink-0" />
                {t(f.errors.summary)} ({errorCount})
              </p>
            )}

            {status === 'error' && (
              <p role="alert" className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
                <CircleAlert className="h-5 w-5 shrink-0" />
                {t(f.failure)}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 px-1 pt-2">
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary min-w-36 disabled:cursor-wait"
                >
                  {status === 'sending' ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      {t(f.sending)}
                    </>
                  ) : hasWhatsApp ? (
                    <>
                      <WhatsAppIcon className="h-5 w-5" />
                      {t(f.submit)}
                    </>
                  ) : (
                    t(f.submitPlain)
                  )}
                </button>
                {DRY_RUN && (
                  <span dir="ltr" className="rounded bg-ink px-2 py-1 font-mono text-[11px] font-bold text-accent-300">
                    DRY RUN
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={handleClear}
                className="rounded-full px-3 py-2 font-display text-sm font-semibold text-accent-700 transition hover:bg-accent-50"
              >
                {t(f.clear)}
              </button>
            </div>

            <p className="px-1 pt-1 text-xs leading-relaxed text-ink/50">
              {t(f.privacy)}{' '}
              <a href="#privacy" className="font-semibold text-accent-700 underline-offset-4 hover:underline">
                {t(content.privacy.link)}
              </a>
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
