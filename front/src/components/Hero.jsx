import { ArrowRight, Check } from 'lucide-react'
import { coach, contact } from '../config'
import { content } from '../content'
import { useLang } from '../lib/i18n'
import { publicUrl } from '../lib/publicUrl'
import { WhatsAppIcon } from './icons'

/** Carte « programme de la semaine » (affichée tant qu'il n'y a pas de photo du coach) */
function ProgramCard() {
  const { t } = useLang()
  const s = content.hero.sheet

  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      {/* Carte bleue posée derrière, inclinée */}
      <div className="absolute inset-0 rotate-6 rounded-[2rem] bg-accent-500" />

      <div className="relative -rotate-2 rounded-[2rem] bg-white p-6 text-ink-900 shadow-card sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p dir="ltr" className="font-num text-sm font-bold uppercase italic tracking-[0.18em] text-ink-900/40 rtl:text-right">
              {coach.brand} {coach.brandSuffix}
            </p>
            <p className="font-display text-3xl leading-tight">{t(s.title)}</p>
          </div>
          <span className="shrink-0 whitespace-nowrap rounded-full bg-accent-500 px-3.5 py-1.5 font-display text-sm text-on-accent">
            {t(s.week)}
          </span>
        </div>

        <ul className="mt-4 space-y-2">
          {s.days.map((d, i) => (
            <li key={i} className={`flex items-center gap-3 rounded-2xl px-3.5 py-3 ${d.done ? 'bg-paper-100' : 'bg-accent-50'}`}>
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg ${
                  d.done ? 'bg-accent-500 text-on-accent' : 'border-2 border-accent-500/40 bg-white'
                }`}
              >
                {d.done && <Check className="h-3.5 w-3.5" strokeWidth={3.5} />}
              </span>
              <span className="w-14 shrink-0 text-sm font-semibold text-ink-900/45">{t(d.day)}</span>
              <span className={`min-w-0 flex-1 font-display text-lg ${d.done ? 'text-ink-900/40 line-through' : ''}`}>{t(d.name)}</span>
            </li>
          ))}
        </ul>

        <dl className="mt-4 grid grid-cols-4 gap-2">
          {s.macros.map((m, i) => (
            <div key={i} className="flex flex-col-reverse items-center rounded-2xl bg-ink-900 px-1 py-2.5 text-center text-white">
              <dt className="text-[11px] text-paper-400">{t(m.label)}</dt>
              <dd dir="ltr" className="font-num text-xl font-extrabold italic leading-none">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="absolute -bottom-6 start-2 flex -rotate-3 items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 font-display text-[15px] leading-none text-white shadow-card sm:start-6">
        <WhatsAppIcon className="h-4 w-4" />
        {t(s.sticker)}
      </div>
    </div>
  )
}

/** Photo du coach (si coach.photo est renseigné dans src/config.js) */
function CoachPhoto() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute inset-0 rotate-6 rounded-[2rem] bg-accent-500" />
      <img
        src={publicUrl(coach.photo)}
        alt={`${coach.brand} ${coach.brandSuffix}`}
        className="relative aspect-[4/5] w-full -rotate-2 rounded-[2rem] object-cover shadow-card"
        fetchPriority="high"
      />
      {contact.instagramHandle && (
        <p dir="ltr" className="absolute -bottom-5 start-6 -rotate-3 rounded-full bg-white px-4 py-2 font-num text-lg font-extrabold italic text-ink-900 shadow-card">
          @{contact.instagramHandle}
        </p>
      )}
    </div>
  )
}

export default function Hero() {
  const { t, lang } = useLang()
  const h = content.hero

  return (
    <section id="top" className="relative overflow-hidden bg-ink-900 pt-16 lg:pt-20">
      {/* Fond : lignes de vitesse + nom géant en contour */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="speed-lines absolute inset-y-0 end-0 w-2/3" />
        <p
          dir="ltr"
          className="text-outline-faint absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-num text-[9rem] font-extrabold uppercase italic leading-none sm:-bottom-12 sm:text-[17rem]"
        >
          {coach.brand}
        </p>
      </div>

      <div className="container-x relative grid grid-cols-1 items-center gap-16 pb-28 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:pb-36 lg:pt-20">
        <div className="min-w-0">
          <p className="tag">
            <span className="h-2 w-2 rounded-full bg-accent-400" />
            {t(h.kicker)}
          </p>

          {/* Chaque morceau est incliné séparément pour que les lignes restent alignées */}
          <h1
            className={`mt-6 font-display text-white ${
              lang === 'ar'
                ? 'text-[3.1rem] leading-[1.25] sm:text-[4.3rem] xl:text-[5rem]'
                : 'text-[2.6rem] leading-[1.1] sm:text-[3.3rem] xl:text-[3.6rem]'
            }`}
          >
            <span className="slant inline-block">{t(h.title1)}</span>{' '}
            <span className={`slant inline-block text-accent-400 ${lang === 'ar' ? 'whitespace-nowrap' : ''}`}>{t(h.title2)}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper-300 sm:text-xl">{t(h.subtitle)}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#pricing" className="btn-primary">
              {t(h.ctaPrimary)}
              <ArrowRight className="h-5 w-5 rtl:-scale-x-100" />
            </a>
            <a href="#how" className="btn-ghost">
              {t(h.ctaSecondary)}
            </a>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
            {h.facts.map((f, i) => (
              <div key={i} className="flex flex-col-reverse rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:rounded-3xl sm:p-4">
                <dt className="mt-1 text-xs leading-snug text-paper-400 sm:text-sm">{t(f.label)}</dt>
                <dd className="font-display text-[1.35rem] leading-tight text-white sm:text-3xl">{t(f.value)}</dd>
              </div>
            ))}
          </dl>
        </div>

        {coach.photo ? <CoachPhoto /> : <ProgramCard />}
      </div>
    </section>
  )
}
