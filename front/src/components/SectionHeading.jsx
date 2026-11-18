import { useLang } from '../lib/i18n'

/**
 * Titre de section : étiquette arrondie + grand titre incliné (style affiche sport).
 * light = section à fond clair · center = centré
 */
export default function SectionHeading({ tag, title, subtitle, light = false, center = false, className = '' }) {
  const { t, lang } = useLang()
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} ${className}`}>
      {tag && <p className={light ? 'tag-light' : 'tag'}>{t(tag)}</p>}
      <h2
        className={`mt-5 font-display ${
          lang === 'ar' ? 'text-[2.4rem] leading-[1.3] sm:text-[3.3rem]' : 'text-[2.2rem] leading-[1.12] sm:text-[3rem]'
        } ${light ? 'text-ink-900' : 'text-white'}`}
      >
        <span className="slant inline-block">{t(title)}</span>
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-ink-900/70' : 'text-paper-300'}`}>{t(subtitle)}</p>
      )}
    </div>
  )
}
