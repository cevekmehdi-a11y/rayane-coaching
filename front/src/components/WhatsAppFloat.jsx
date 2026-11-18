import { content } from '../content'
import { useLang } from '../lib/i18n'
import { hasWhatsApp, whatsappHref } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons'

/** Bouton WhatsApp flottant — affiché dès qu'un numéro ou un lien WhatsApp est renseigné dans src/config.js */
export default function WhatsAppFloat() {
  const { t } = useLang()
  if (!hasWhatsApp) return null

  return (
    <a
      href={whatsappHref(t(content.whatsapp.defaultMessage))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t(content.whatsapp.floatLabel)}
      title={t(content.whatsapp.floatLabel)}
      className="fixed bottom-5 end-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition hover:scale-105"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </a>
  )
}
