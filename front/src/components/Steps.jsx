import { content } from '../content'
import { useLang } from '../lib/i18n'
import SectionHeading from './SectionHeading'

export default function Steps() {
  const { t } = useLang()
  const s = content.steps

  return (
    <section id="how" className="relative overflow-hidden bg-ink-900 py-20 sm:py-28">
      <div aria-hidden="true" className="speed-lines pointer-events-none absolute inset-0" />

      <div className="container-x relative">
        <SectionHeading tag={s.kicker} title={s.title} />

        <ol className="relative mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Ligne qui relie les étapes (grand écran) */}
          <li aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-8 hidden h-0.5 bg-accent-500/30 lg:block" />
          {s.items.map((item, i) => (
            <li key={i} className="relative">
              <span
                dir="ltr"
                className="slant grid h-16 w-16 place-items-center rounded-2xl bg-accent-500 font-num text-[2rem] font-extrabold italic leading-none text-on-accent shadow-glow"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 font-display text-2xl leading-snug text-white">{t(item.title)}</h3>
              <p className="mt-2 leading-relaxed text-paper-300">{t(item.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
