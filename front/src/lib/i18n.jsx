import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

/**
 * Langues du site : arabe (par défaut, RTL) et français (LTR).
 * Les textes sont des objets { ar: '…', fr: '…' } — t() renvoie la bonne version.
 */
export const LANGS = ['ar', 'fr']
const STORAGE_KEY = 'rc-lang'

const LangContext = createContext(null)

function readStoredLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return LANGS.includes(saved) ? saved : 'ar'
  } catch {
    return 'ar'
  }
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(readStoredLang)
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* stockage indisponible (navigation privée…) : on ignore */
    }
  }, [lang, dir])

  // t('texte') ou t({ ar, fr }) — accepte aussi des variables : t(obj, { name: 'Ali' }) remplace {name}
  const t = useCallback(
    (value, vars) => {
      let s = ''
      if (value == null) s = ''
      else if (typeof value === 'string' || typeof value === 'number') s = String(value)
      else s = value[lang] ?? value.ar ?? ''
      if (vars) s = s.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '')
      // Typographie française : espace insécable avant ? ! : ; » et après « (évite les retours à la ligne)
      if (lang === 'fr') s = s.replace(/ ([?!:;»])/g, ' $1').replace(/« /g, '« ')
      return s
    },
    [lang],
  )

  const ctx = useMemo(() => ({ lang, dir, setLang, t }), [lang, dir, t])
  return <LangContext.Provider value={ctx}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
