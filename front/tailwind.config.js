/** @type {import('tailwindcss').Config} */

// Les couleurs viennent des variables CSS définies dans src/index.css (palettes).
// Pour changer toutes les couleurs du site, c'est là-bas — pas ici.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`
const scale = (name, steps) => Object.fromEntries(steps.map((s) => [s, v(`${name}-${s}`)]))

export default {
  // relative: true → les chemins sont lus depuis ce fichier, quel que soit le dossier de lancement
  content: {
    relative: true,
    files: ['./index.html', './src/**/*.{js,jsx}'],
  },
  theme: {
    extend: {
      colors: {
        // Fonds sombres
        ink: { DEFAULT: v('ink-900'), ...scale('ink', [600, 700, 800, 900, 950]) },
        // Couleur de la marque
        accent: scale('accent', [50, 100, 200, 300, 400, 500, 600, 700, 800]),
        // Texte posé sur la couleur de la marque (blanc ou foncé selon la palette)
        'on-accent': v('on-accent'),
        // Fonds clairs (formulaire)
        paper: scale('paper', [50, 100, 200, 300, 400, 500]),
      },
      fontFamily: {
        // Texte courant : IBM Plex Sans Arabic (arabe + latin)
        sans: ['"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        // Titres et boutons : Lalezar (arabe épais et rond, style affiche sport)
        display: ['Lalezar', '"IBM Plex Sans Arabic"', 'sans-serif'],
        // Chiffres, prix, nom de marque : Barlow Condensed italique
        num: ['"Barlow Condensed"', 'Lalezar', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 14px 40px -12px rgb(var(--accent-500) / .75)',
        card: '0 20px 50px -24px rgb(0 0 0 / .6)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        flash: {
          '0%': { boxShadow: '0 0 0 0 rgb(var(--accent-500) / .5)' },
          '100%': { boxShadow: '0 0 0 12px rgb(var(--accent-500) / 0)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'marquee-slow': 'marquee 55s linear infinite',
        flash: 'flash 1.2s ease-out 2',
      },
    },
  },
  plugins: [],
}
