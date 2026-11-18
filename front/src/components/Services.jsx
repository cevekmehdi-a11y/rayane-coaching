import { content } from '../content'
import { useLang } from '../lib/i18n'
import SectionHeading from './SectionHeading'

export default function Services() {
  const { t } = useLang()
  const s = content.services

  return (
    <section id="services" className="bg-ink-950 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading tag={s.kicker} title={s.title} subtitle={s.subtitle} />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {s.items.map((item, i) => (
            <article
              key={i}
              className="card-dark group relative overflow-hidden p-7 transition duration-300 hover:-translate-y-1 hover:border-accent-500/50 sm:p-9"
            >
              {/* Grand numéro en contour, dans le coin */}
              <span
                dir="ltr"
                className="text-outline pointer-events-none absolute -top-4 end-4 font-num text-[7rem] font-extrabold italic leading-none opacity-50 transition group-hover:opacity-100"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="relative mt-12 font-display text-[2rem] leading-tight text-white">
                <span className="slant inline-block">{t(item.title)}</span>
              </h3>
              <p className="relative mt-3 max-w-sm leading-relaxed text-paper-300">{t(item.text)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
