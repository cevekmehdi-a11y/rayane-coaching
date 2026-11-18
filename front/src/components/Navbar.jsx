import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { contact } from '../config'
import { content } from '../content'
import { useLang } from '../lib/i18n'
import { InstagramIcon } from './icons'
import Logo from './Logo'

function LangSwitch() {
  const { lang, setLang } = useLang()
  const options = [
    { code: 'ar', label: 'ع', name: 'العربية' },
    { code: 'fr', label: 'FR', name: 'Français' },
  ]
  return (
    <div dir="ltr" role="group" aria-label="Langue / اللغة" className="flex rounded-full bg-white/10 p-1">
      {options.map((o) => (
        <button
          key={o.code}
          type="button"
          lang={o.code}
          title={o.name}
          aria-label={o.name}
          aria-pressed={lang === o.code}
          onClick={() => setLang(o.code)}
          className={`min-w-9 rounded-full px-2.5 py-1 font-display text-sm leading-none transition ${
            lang === o.code ? 'bg-white text-ink-900' : 'text-paper-300 hover:text-white'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export default function Navbar() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const nav = content.nav

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-ink-900/85 backdrop-blur-md">
      <nav className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 font-display text-[17px] text-paper-300 transition hover:bg-white/5 hover:text-white"
              >
                {t(link.label)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          {contact.instagram && (
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram @${contact.instagramHandle}`}
              title={`@${contact.instagramHandle}`}
              className="hidden h-9 w-9 place-items-center rounded-full bg-white/10 text-paper-200 transition hover:bg-white/20 hover:text-white sm:grid"
            >
              <InstagramIcon className="h-[18px] w-[18px]" />
            </a>
          )}
          <LangSwitch />
          <a href="#signup" className="btn-primary hidden !px-5 !py-2.5 !text-base sm:inline-flex">
            {t(nav.cta)}
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t(open ? nav.closeMenu : nav.openMenu)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-white/[0.07] lg:hidden">
          <ul className="container-x flex flex-col gap-1 py-3">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 font-display text-xl text-white hover:bg-white/5"
                >
                  {t(link.label)}
                </a>
              </li>
            ))}
            {contact.instagram && (
              <li>
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-2xl px-4 py-3 font-display text-xl text-white hover:bg-white/5"
                >
                  <InstagramIcon className="h-5 w-5" />
                  {t(nav.instagram)}
                  <span dir="ltr" className="font-sans text-sm text-paper-400">
                    @{contact.instagramHandle}
                  </span>
                </a>
              </li>
            )}
            <li className="px-1 pb-2 pt-3">
              <a href="#signup" onClick={() => setOpen(false)} className="btn-primary w-full">
                {t(nav.cta)}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
