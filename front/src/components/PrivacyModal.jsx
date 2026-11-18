import { useEffect, useRef, useState } from 'react'
import { ShieldCheck, X } from 'lucide-react'
import { googleForm } from '../config'
import { content } from '../content'
import { useLang } from '../lib/i18n'

export const PRIVACY_HASH = '#privacy'

/** Page « Confidentialité » affichée en fenêtre par-dessus le site (lien : #privacy) */
export default function PrivacyModal() {
  const { t } = useLang()
  const p = content.privacy
  const [open, setOpen] = useState(() => window.location.hash === PRIVACY_HASH)
  const closeRef = useRef(null)

  useEffect(() => {
    const onHash = () => setOpen(window.location.hash === PRIVACY_HASH)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    const onKey = (e) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previous?.focus?.()
    }
  }, [open])

  function close() {
    // Retire #privacy de l'adresse sans faire sauter la page
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    setOpen(false)
  }

  if (!open) return null
  const sections = p.sections.filter((s) => !s.onlyIfGoogleForm || googleForm.enabled)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
      onClick={close}
      className="fixed inset-0 z-[60] grid place-items-center bg-ink-950/70 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-md border-t-[6px] border-accent-500 bg-white p-6 text-ink shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[3px] bg-ink text-paper-50">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <h2 id="privacy-title" className="font-display text-2xl font-bold leading-tight">
                {t(p.title)}
              </h2>
              <p className="text-sm text-ink/50">{t(p.updated)}</p>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label={t(p.close)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-[3px] bg-paper-200 transition hover:bg-paper-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-5">
          {sections.map((s, i) => (
            <section key={i}>
              <h3 className="font-bold">{t(s.title)}</h3>
              <p className="mt-1 leading-relaxed text-ink/70">{t(s.text)}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
