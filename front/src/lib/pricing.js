import { discount } from '../config'

/** Ancien prix barré affiché avec la réduction : 1 900 DA à −30 % → 2 700 DA (arrondi à 50 DA). null sans réduction. */
export function oldPrice(price) {
  if (!(discount > 0 && discount < 100)) return null
  return Math.round(price / (1 - discount / 100) / 50) * 50
}
