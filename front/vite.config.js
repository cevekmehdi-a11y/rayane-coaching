import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Sous-dossier où le site est publié. Sur Cloudflare Pages ou avec un nom de domaine, le site est à la racine : '/'.
// Pour le publier dans un sous-dossier (ex. /rayane-coaching/), définis BASE_PATH avant le build.
const base = (process.env.BASE_PATH || '/').replace(/^\/*/, '/').replace(/\/*$/, '/')

// Adresse publique du site, utilisée pour l'image d'aperçu des liens (og:image doit être une URL complète).
// Elle est définie dans les réglages du projet Cloudflare : variable SITE_URL (ex. https://rayane-coaching.pages.dev).
const siteUrl = (process.env.SITE_URL || '').replace(/\/+$/, '')

/** Remplace __SITE_URL__ dans index.html et ajoute l'URL canonique quand l'adresse est connue */
function siteUrlPlugin() {
  return {
    name: 'site-url',
    transformIndexHtml(html) {
      const out = html.replaceAll('__SITE_URL__', siteUrl)
      if (!siteUrl) return out
      return out.replace(
        '</head>',
        `  <link rel="canonical" href="${siteUrl}/" />\n    <meta property="og:url" content="${siteUrl}/" />\n  </head>`,
      )
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), siteUrlPlugin()],
  server: {
    port: 3000,
    strictPort: true,
  },
})
