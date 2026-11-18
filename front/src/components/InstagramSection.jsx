import { ArrowUpRight } from 'lucide-react'
import { contact } from '../config'
import { content } from '../content'
import { useLang } from '../lib/i18n'
import { InstagramIcon } from './icons'

/** Bandeau Instagram — affiché si un lien Instagram est renseigné dans src/config.js */
export default function InstagramSection() {
  const { t } = useLang()
  if (!contact.instagram) return null
  const ig = content.instagram

  return (
    <section id="instagram" className="bg-ink-950 pb-20 sm:pb-28">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-accent-500 to-accent-700 px-7 py-10 text-white shadow-glow sm:px-12 sm:py-14">
          <div aria-hidden="true" className="speed-lines pointer-events-none absolute inset-0" />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 font-display text-[15px]">
                <InstagramIcon className="h-4 w-4" />
                {t(ig.title)}
              </p>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="mt-5 block break-words font-num text-5xl font-extrabold uppercase italic leading-none tracking-tight sm:text-7xl rtl:text-right"
              >
                @{contact.instagramHandle}
              </a>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-accent-50/90">{t(ig.text)}</p>
            </div>
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="btn-light shrink-0 self-start md:self-auto">
              <InstagramIcon className="h-5 w-5" />
              {t(ig.button)}
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
