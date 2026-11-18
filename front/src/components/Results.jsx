import { results } from '../config'
import { content } from '../content'
import { useLang } from '../lib/i18n'
import { publicUrl } from '../lib/publicUrl'
import SectionHeading from './SectionHeading'

/** Transformations (avant / après) — affichées seulement si `results` contient des photos dans src/config.js */
export default function Results() {
  const { t } = useLang()
  if (!results.length) return null

  return (
    <section id="results" className="bg-ink-900 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading tag={content.results.eyebrow} title={content.results.title} />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((r, i) => (
            <figure key={i} className="card-dark overflow-hidden">
              <img src={publicUrl(r.image)} alt={t(r.caption)} className="aspect-square w-full object-cover" loading="lazy" />
              {r.caption && <figcaption className="p-5 font-display text-xl text-white">{t(r.caption)}</figcaption>}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
