import { coach } from '../config'

export default function Logo({ className = '' }) {
  return (
    // dir="ltr" : le logo latin garde le même sens en arabe et en français
    <a href="#top" dir="ltr" className={`flex items-center gap-2 ${className}`} aria-label={`${coach.brand} ${coach.brandSuffix}`}>
      <span className="font-num text-[27px] font-extrabold uppercase italic leading-none tracking-wide text-white">{coach.brand}</span>
      <span className="h-6 w-1.5 -skew-x-12 rounded-full bg-accent-500" />
      <span className="font-num text-[13px] font-bold uppercase italic leading-none tracking-[0.22em] text-paper-400">
        {coach.brandSuffix}
      </span>
    </a>
  )
}
