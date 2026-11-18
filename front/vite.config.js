import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Sous-dossier où le site est publié. Sur GitHub Pages, le déploiement le fournit (ex. /rayane-coaching/).
// Ailleurs (Vercel, Netlify, nom de domaine) le site est à la racine : '/'.
const base = (process.env.BASE_PATH || '/').replace(/^\/*/, '/').replace(/\/*$/, '/')

// Adresse publique du site, utilisée pour l'image d'aperçu des liens (og:image doit être une URL complète).
// Sur Vercel et GitHub Pages elle est trouvée automatiquement ; sinon définis SITE_URL (ex. https://rayanecoaching.com).
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
).replace(/\/+$/, '')

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
