import { ArrowRight } from 'lucide-react'
import { coach, contact, credit } from '../config'
import { content } from '../content'
import { useLang } from '../lib/i18n'
import { hasWhatsApp, whatsappHref } from '../lib/whatsapp'
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from './icons'
import Logo from './Logo'

/** Dernier appel à l'action + pied de page */
export default function Footer() {
  const { t } = useLang()
  const cta = content.cta
  const socials = [
    hasWhatsApp && { href: whatsappHref(t(content.whatsapp.defaultMessage)), label: 'WhatsApp', Icon: WhatsAppIcon },
    contact.instagram && { href: contact.instagram, label: 'Instagram', Icon: InstagramIcon },
    contact.tiktok && { href: contact.tiktok, label: 'TikTok', Icon: TikTokIcon },
    contact.facebook && { href: contact.facebook, label: 'Facebook', Icon: FacebookIcon },
  ].filter(Boolean)

  return (
    <footer className="relative overflow-hidden bg-ink-900 text-paper-50">
      <div aria-hidden="true" className="speed-lines pointer-events-none absolute inset-0" />

      <div className="container-x relative py-20 text-center sm:py-28">
        <h2 className="font-display text-[3.4rem] leading-[1.2] text-white sm:text-8xl">
          <span className="slant inline-block">{t(cta.title)}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-paper-300">{t(cta.subtitle)}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href="#signup" className="btn-primary">
            {t(cta.button)}
            <ArrowRight className="h-5 w-5 rtl:-scale-x-100" />
          </a>
          {hasWhatsApp && (
            <a href={whatsappHref(t(content.whatsapp.defaultMessage))} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <WhatsAppIcon className="h-5 w-5" />
              {t(cta.whatsapp)}
            </a>
          )}
        </div>
      </div>

      <div className="relative border-t border-white/[0.07]">
        <div className="container-x flex flex-col items-center justify-between gap-7 py-9 text-center sm:flex-row sm:text-start">
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <Logo />
            <p className="text-sm text-paper-400">{t(content.footer.tagline)}</p>
          </div>

          {socials.length > 0 && (
            <ul className="flex items-center gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.07] text-paper-200 transition hover:bg-accent-500 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-col items-center gap-2 sm:items-end">
            <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-paper-400 sm:justify-end">
              <span>
                © {new Date().getFullYear()}{' '}
                <bdi dir="ltr">
                  {coach.brand} {coach.brandSuffix}
                </bdi>{' '}
                — {t(content.footer.rights)}
              </span>
              <span aria-hidden="true" className="hidden sm:inline">
                ·
              </span>
              <a href="#privacy" className="underline-offset-4 transition hover:text-white hover:underline">
                {t(content.privacy.link)}
              </a>
            </p>
            {credit?.name && (
              <p dir="ltr" className="flex items-center gap-1.5 text-xs text-paper-500">
                {credit.label}
                <a
                  href={credit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-accent-300 underline-offset-4 transition hover:text-white hover:underline"
                >
                  <InstagramIcon className="h-3.5 w-3.5" />
                  {credit.name}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
