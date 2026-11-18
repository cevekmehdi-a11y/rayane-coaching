/**
 * Envoie une réponse directement dans le Google Form du coach.
 * Les réponses arrivent au même endroit qu'avant (onglet « Réponses » / Google Sheets).
 *
 * Google ne permet pas de lire la réponse (mode « no-cors ») : on considère l'envoi réussi
 * si la requête part sans erreur réseau. D'où l'importance que les valeurs des choix
 * correspondent EXACTEMENT aux options du Google Form (voir src/config.js).
 */
export async function submitGoogleForm(action, fields, { timeout = 15000 } = {}) {
  const body = new URLSearchParams()
  for (const [key, value] of Object.entries(fields)) {
    if (value != null && String(value).trim() !== '') body.append(key, String(value).trim())
  }
  body.append('fvv', '1')
  body.append('pageHistory', '0')

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    await fetch(action, { method: 'POST', mode: 'no-cors', body, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}
