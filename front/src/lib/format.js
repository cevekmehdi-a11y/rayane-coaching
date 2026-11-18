const numberFormat = new Intl.NumberFormat('fr-FR')

/** 2900 → « 2 900 » */
export const formatNumber = (n) => numberFormat.format(n)

/** Convertit les chiffres arabes-indiens (٠١٢…) et persans (۰۱۲…) en chiffres occidentaux. */
export function normalizeDigits(value) {
  return String(value ?? '')
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
}

/** Lien WhatsApp avec message pré-rempli. `number` au format international sans « + ». */
export function waLink(number, text) {
  const clean = String(number).replace(/\D/g, '')
  return `https://wa.me/${clean}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}
