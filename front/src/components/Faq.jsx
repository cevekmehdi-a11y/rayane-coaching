import { Plus } from 'lucide-react'
import { content } from '../content'
import { useLang } from '../lib/i18n'
import { hasWhatsApp, whatsappHref } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons'
import SectionHeading from './SectionHeading'

export default function Faq() {
  const { t } = useLang()
  const faq = content.faq

  return (
    <section id="faq" className="bg-ink-950 py-20 sm:py-28">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading tag={faq.kicker} title={faq.title} />
          {hasWhatsApp && (
            <div className="card-dark mt-10 p-7">
              <p className="slant font-display text-2xl text-white">{t(faq.asideTitle)}</p>
              <p className="mt-2 leading-relaxed text-paper-300">{t(faq.asideText)}</p>
              <a
                href={whatsappHref(t(content.whatsapp.defaultMessage))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-6 bg-[#25D366] text-white hover:-translate-y-0.5 hover:brightness-95"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t(faq.asideButton)}
              </a>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {faq.items.map((item, i) => (
            <details key={i} className="card-dark group overflow-hidden !rounded-2xl" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 font-display text-xl text-white transition hover:bg-white/[0.03] [&::-webkit-details-marker]:hidden">
                {t(item.q)}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-white transition group-open:rotate-45 group-open:bg-accent-500">
                  <Plus className="h-5 w-5" />
                </span>
              </summary>
              <p className="px-6 pb-6 leading-relaxed text-paper-300">{t(item.a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
