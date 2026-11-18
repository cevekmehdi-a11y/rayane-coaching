import { Check } from 'lucide-react'
import { currency, plans } from '../config'
import { content } from '../content'
import { useLang } from '../lib/i18n'
import { formatNumber } from '../lib/format'
import SectionHeading from './SectionHeading'

function Perk({ children, onBlue = false }) {
  return (
    <li className="flex gap-2.5">
      <span
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
          onBlue ? 'bg-white text-accent-600' : 'bg-accent-500/20 text-accent-300'
        }`}
      >
        <Check className="h-3 w-3" strokeWidth={3.5} />
      </span>
      {children}
    </li>
  )
}

export default function Pricing({ onChoose }) {
  const { t } = useLang()
  const p = content.pricing
  // Prix mensuel de référence (formule 1 mois) pour calculer l'économie
  const monthly = plans.find((plan) => plan.months === 1)?.price ?? plans[0].price / plans[0].months

  return (
    <section id="pricing" className="bg-ink-950 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading tag={p.kicker} title={p.title} subtitle={p.subtitle} />

        {/* Téléphone / tablette : les avantages (identiques pour toutes les formules) une seule fois */}
        <div className="card-dark mt-10 p-6 lg:hidden">
          <p className="font-display text-xl text-white">{t(p.perksTitle)}</p>
          <ul className="mt-4 grid gap-3 text-[15px] leading-snug text-paper-200 sm:grid-cols-2">
            {p.perks.map((perk, k) => (
              <Perk key={k}>{t(perk)}</Perk>
            ))}
          </ul>
        </div>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {plans.map((plan) => {
            const saving = Math.round(monthly * plan.months - plan.price)
            const featured = plan.featured
            return (
              <article
                key={plan.id}
                className={`relative flex flex-col rounded-3xl p-6 sm:p-7 ${
                  featured
                    ? 'mt-3 bg-gradient-to-b from-accent-500 to-accent-700 text-white shadow-glow lg:mt-0 lg:-translate-y-4'
                    : 'card-dark text-white'
                }`}
              >
                {plan.badge && (
                  <span className="slant absolute inset-x-0 -top-4 mx-auto w-fit rounded-full bg-white px-4 py-2 font-display text-[15px] leading-none text-accent-700 shadow-card">
                    {t(plan.badge)}
                  </span>
                )}

                {/* Mobile : nom et prix sur la même ligne — grand écran : l'un sous l'autre */}
                <div className="flex items-end justify-between gap-4 lg:block">
                  <div>
                    <p className={`text-sm font-semibold ${featured ? 'text-accent-100' : 'text-accent-300'}`}>
                      {t(p.planSubtitle)}
                    </p>
                    <h3 className="slant mt-1 font-display text-[2rem] leading-tight lg:text-[2.1rem]">{t(plan.name)}</h3>
                  </div>
                  <div dir="ltr" className="flex shrink-0 items-baseline gap-1.5 lg:mt-5 rtl:justify-end">
                    <span className="tabular font-num text-5xl font-extrabold italic leading-none lg:text-[4.2rem]">
                      {formatNumber(plan.price)}
                    </span>
                    <span className="font-num text-xl font-bold italic opacity-70 lg:text-2xl">{currency}</span>
                  </div>
                </div>

                <div className="mt-4 min-h-8">
                  {saving > 0 ? (
                    <span
                      className={`inline-block rounded-full px-3 py-1.5 text-sm font-semibold ${
                        featured ? 'bg-white/15 text-white' : 'bg-accent-500/15 text-accent-300'
                      }`}
                    >
                      {t(p.save)}{' '}
                      <bdi dir="ltr">
                        {formatNumber(saving)} {currency}
                      </bdi>
                    </span>
                  ) : (
                    plan.note && <span className="text-sm text-paper-400">{t(plan.note)}</span>
                  )}
                </div>

                {/* Grand écran : la liste des avantages dans chaque carte */}
                <ul
                  className={`mt-6 hidden flex-1 space-y-3 border-t pt-6 text-[15px] leading-snug lg:block ${
                    featured ? 'border-white/20' : 'border-white/10 text-paper-200'
                  }`}
                >
                  {p.perks.map((perk, k) => (
                    <Perk key={k} onBlue={featured}>
                      {t(perk)}
                    </Perk>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => onChoose(plan.id)}
                  className={`mt-5 w-full lg:mt-8 ${featured ? 'btn-light' : 'btn-primary'}`}
                >
                  {t(p.choose)}
                </button>
              </article>
            )
          })}
        </div>

        <ul className="mt-10 flex flex-wrap gap-2.5">
          {p.notes.map((note, i) => (
            <li key={i} className="rounded-full border border-white/10 px-4 py-2 text-sm text-paper-300">
              {t(note)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
