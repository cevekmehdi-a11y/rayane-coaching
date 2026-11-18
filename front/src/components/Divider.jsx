/**
 * Transition en biais entre deux sections de couleurs différentes.
 * from = couleur de la section du dessus, to = couleur de la section du dessous (classes bg-*).
 */
export default function Divider({ from, to, flip = false }) {
  return (
    <div aria-hidden="true" className={`relative h-14 sm:h-24 ${to}`}>
      <div
        className={`absolute inset-0 ${from}`}
        style={{ clipPath: flip ? 'polygon(0 0, 100% 0, 0 100%)' : 'polygon(0 0, 100% 0, 100% 100%)' }}
      />
    </div>
  )
}
