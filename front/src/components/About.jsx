import { coach } from '../config'
import { content } from '../content'
import { useLang } from '../lib/i18n'
import { publicUrl } from '../lib/publicUrl'

/** Section « Ton coach » — affichée seulement si une bio est renseignée dans src/config.js */
export default function About() {
  const { t } = useLang()
  const bio = t(coach.bio)
  if (!bio) return null

  return (
    <section id="about" className="bg-ink-900 py-20 sm:py-28">
      <div className="container-x grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-0 rotate-6 rounded-[2rem] bg-accent-500" />
          {coach.photo ? (
            <img
              src={publicUrl(coach.photo)}
              alt={`${coach.brand} ${coach.brandSuffix}`}
              className="relative aspect-[4/5] w-full -rotate-2 rounded-[2rem] object-cover shadow-card"
              loading="lazy"
            />
          ) : (
            <div className="relative grid aspect-[4/5] w-full -rotate-2 place-items-center rounded-[2rem] bg-ink-800 font-num text-[10rem] font-extrabold italic text-white">
              {coach.brand.charAt(0)}
            </div>
          )}
        </div>

        <div>
          <p className="tag">{t(content.about.eyebrow)}</p>
          <h2 dir="ltr" className="mt-5 font-num text-6xl font-extrabold uppercase italic text-white rtl:text-right">
            {coach.brand} <span className="text-accent-400">{coach.brandSuffix}</span>
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-paper-300">
            {bio
              .split('\n')
              .filter(Boolean)
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
          </div>
          {coach.stats.length > 0 && (
            <dl className="mt-9 grid grid-cols-3 gap-3">
              {coach.stats.map((s, i) => (
                <div key={i} className="card-dark flex flex-col-reverse !rounded-2xl p-4">
                  <dt className="mt-1 text-sm text-paper-400">{t(s.label)}</dt>
                  <dd dir="ltr" className="font-num text-4xl font-extrabold italic text-white rtl:text-right">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  )
}
