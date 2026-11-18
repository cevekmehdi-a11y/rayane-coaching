import { contact } from '../config'
import { waLink } from './format'

/** Le coach a renseigné un moyen de le joindre sur WhatsApp (numéro ou lien QR) */
export const hasWhatsApp = Boolean(contact.whatsapp || contact.whatsappLink)

/** Avec le numéro, WhatsApp peut s'ouvrir avec le message déjà écrit (impossible avec un lien QR) */
export const canPrefill = Boolean(contact.whatsapp)

/** Lien vers la conversation avec le coach (message pré-rempli si possible) */
export function whatsappHref(text) {
  if (contact.whatsapp) return waLink(contact.whatsapp, text)
  return contact.whatsappLink || ''
}

/** Copie un texte dans le presse-papiers (avec repli pour les vieux navigateurs). Renvoie true si ça a marché. */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const area = document.createElement('textarea')
      area.value = text
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      const ok = document.execCommand('copy')
      area.remove()
      return ok
    } catch {
      return false
    }
  }
}
