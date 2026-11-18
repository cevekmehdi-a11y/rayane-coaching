/**
 * Adresse d'un fichier du dossier public/ (ex. '/images/coach.jpg').
 * Ajoute le sous-dossier du site quand il y en a un (GitHub Pages : /rayane-coaching/images/coach.jpg).
 * Les adresses complètes (https://…) et les chemins relatifs sont laissés tels quels.
 */
export function publicUrl(path) {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path
  return import.meta.env.BASE_URL + path.slice(1)
}
