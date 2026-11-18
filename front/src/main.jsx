import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { LangProvider } from './lib/i18n.jsx'
// Polices hébergées avec le site (plus rapide, aucun appel à Google Fonts)
// Lalezar : titres et boutons — Barlow Condensed (italique) : chiffres et nom de marque
// IBM Plex Sans Arabic : texte courant
import '@fontsource/lalezar/400.css'
import '@fontsource/barlow-condensed/700-italic.css'
import '@fontsource/barlow-condensed/800-italic.css'
import '@fontsource/ibm-plex-sans-arabic/400.css'
import '@fontsource/ibm-plex-sans-arabic/500.css'
import '@fontsource/ibm-plex-sans-arabic/600.css'
import '@fontsource/ibm-plex-sans-arabic/700.css'
import './index.css'

// Aperçu d'une autre palette sans rien modifier : ?theme=volt | electric | gold | fire
const previewTheme = new URLSearchParams(window.location.search).get('theme')
if (['fire', 'volt', 'electric', 'gold'].includes(previewTheme)) {
  document.documentElement.dataset.theme = previewTheme
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
)
