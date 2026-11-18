import { content } from '../content'
import { useLang } from '../lib/i18n'

/** Une bande de mots qui défile (s'arrête si l'utilisateur préfère réduire les animations) */
function Track({ reverse = false, slow = false }) {
  const { t } = useLang()
  // Mots répétés pour que la boucle ne laisse jamais de vide, même sur grand écran
  const words = [...content.marquee, ...content.marquee, ...content.marquee]
  return (
    <div
      dir="ltr"
      className={`flex w-max motion-reduce:animate-none ${slow ? 'animate-marquee-slow' : 'animate-marquee'}`}
      style={reverse ? { animationDirection: 'reverse' } : undefined}
    >
      {[0, 1].map((copy) => (
        <ul key={copy} className="flex shrink-0 items-center">
          {words.map((word, i) => (
            <li key={i} className="flex items-center gap-7 pe-7 font-display text-2xl leading-none sm:text-[1.75rem]">
              <span dir="auto">{t(word)}</span>
              <span className="h-5 w-1.5 -skew-x-12 rounded-full bg-current opacity-50" />
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

/** Deux bandes croisées façon banderoles d'événement sportif */
export default function Marquee() {
  return (
    <div className="relative h-36 overflow-hidden bg-ink-900 sm:h-40" aria-hidden="true">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[2.5deg] bg-white py-3.5 text-ink-900">
        <Track reverse slow />
      </div>
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 -rotate-[2.5deg] bg-accent-500 py-4 text-on-accent shadow-glow">
        <Track />
      </div>
    </div>
  )
}
