# RAYANE COACHING — site vitrine

Site vitrine d'un coach en ligne (arabe par défaut + version française) : accueil, services,
fonctionnement, **tarifs**, **formulaire d'inscription** façon Google Forms, FAQ, Instagram.

Stack : React 19 + Vite 6 + Tailwind 3 + lucide-react (comme les autres projets).

## Lancer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # version de production dans dist/
```

## Où modifier quoi

| Je veux changer…                                    | Fichier                         |
| --------------------------------------------------- | ------------------------------- |
| Prix et formules                                    | `src/config.js` → `plans`       |
| WhatsApp, Instagram, TikTok, Facebook               | `src/config.js` → `contact`     |
| Coordonnées CCP / BaridiMob (affichées après envoi) | `src/config.js` → `payment`     |
| Nom, photo, présentation du coach                   | `src/config.js` → `coach`       |
| Photos avant/après                                  | `src/config.js` → `results`     |
| Questions du formulaire                             | `src/config.js` → `questions`   |
| Tous les textes (AR / FR)                           | `src/content.js`                |
| Page « Confidentialité »                            | `src/content.js` → `privacy`    |
| Couleurs (palettes)                                 | `src/index.css` (en haut)       |
| Palette active                                      | `index.html` → `data-theme`     |

Les sections « Ton coach », « Résultats » et Instagram et les boutons WhatsApp s'affichent
**automatiquement** dès que les infos correspondantes sont remplies dans `src/config.js`.

## Couleurs

Toutes les couleurs viennent de 4 palettes définies en haut de `src/index.css` :

| Palette    | Style                                    |
| ---------- | ---------------------------------------- |
| `electric` | bleu nuit + bleu électrique ← **active** |
| `fire`     | noir + orange                            |
| `volt`     | noir + vert fluo                         |
| `gold`     | noir + or (palette d'origine)            |

- **Voir une palette sans rien modifier** : ajoute `?theme=fire` (ou `volt`, `gold`) à l'adresse du
  site — pratique pour montrer les options au coach.
- **Changer la palette pour de bon** : modifie `data-theme="electric"` sur la balise `<html>` de
  `index.html`. Pense aussi à `public/favicon.svg`, aux icônes PNG et à `public/og-image.png`
  (dessinés en bleu), ainsi qu'à `theme-color` dans `index.html` et `site.webmanifest`.
- Les classes Tailwind utilisent des noms neutres : `ink` (fonds sombres), `accent` (couleur de la
  marque), `paper` (fonds clairs).

## Le formulaire → WhatsApp du coach

Quand le client clique sur « إرسال على الواتساب », toutes ses réponses sont mises en forme dans un
message WhatsApp adressé au coach :

- **Avec le numéro du coach** (`contact.whatsapp`, ex. `213555123456`) : WhatsApp s'ouvre avec le
  message **déjà écrit**, le client n'a plus qu'à appuyer sur « Envoyer ». ← mode actuel (0784 94 72 35)
- **Avec seulement le lien QR** (`contact.whatsappLink`) : WhatsApp n'accepte pas de message
  pré-rempli sur ce type de lien. Le message est donc **copié automatiquement** et le site explique
  au client comment l'envoyer : ouvrir la conversation, coller, envoyer.

Le message n'arrive chez le coach que si le client appuie sur « Envoyer » dans WhatsApp.
Pour garder aussi une trace de chaque inscription, passe `googleForm.enabled` à `true` : une copie
part alors dans le Google Form du coach (dans ce cas, les `formValue` des formules doivent
correspondre **exactement** aux options du Google Form).

Pour tester sans rien ouvrir ni envoyer : `http://localhost:3000/?dryrun` en dev (le message
s'affiche dans la console du navigateur).

## Mise en ligne

### Sur GitHub Pages (gratuit)

Le fichier `.github/workflows/deploy.yml` (dans le dossier `rayen`, au-dessus de `front`) reconstruit
le site et le met en ligne **tout seul à chaque `git push`** sur la branche `main`.

**La première fois :**

1. Sur [github.com/new](https://github.com/new) : nom `rayane-coaching`, visibilité **Public**
   (obligatoire pour GitHub Pages avec un compte gratuit), sans README → **Create repository**.
2. Dans un terminal ouvert dans le dossier `rayen` (pas `front`) :

   ```bash
   git config --global user.name "Ton nom"
   git config --global user.email "ton-adresse@exemple.com"
   git init -b main
   git add .
   git commit -m "Premier envoi du site"
   git remote add origin https://github.com/TON-PSEUDO/rayane-coaching.git
   git push -u origin main
   ```

   Les deux `git config` ne servent qu'une fois par ordinateur. L'adresse e-mail apparaît dans
   l'historique public du dépôt : pour la cacher, utilise celle en `@users.noreply.github.com`
   indiquée dans GitHub → Settings → Emails. Au premier `git push`, une fenêtre s'ouvre pour te
   connecter à GitHub.
3. Dans le dépôt sur GitHub : **Settings → Pages → Build and deployment → Source : GitHub Actions**.
4. Onglet **Actions** → « Déployer sur GitHub Pages » → **Run workflow**. Le premier essai, lancé
   par le `git push`, est en rouge parce que Pages n'était pas encore activé : c'est normal.
   1 à 2 minutes plus tard, le site est en ligne sur `https://TON-PSEUDO.github.io/rayane-coaching/`.

**Ensuite**, pour publier une modification :

```bash
git add .
git commit -m "Nouveaux prix"
git push
```

Le site se met à jour tout seul en 1 à 2 minutes (suivi dans l'onglet **Actions**).

- **Nom de domaine** (ex. `rayanecoaching.com`) : Settings → Pages → Custom domain. Le build
  s'adapte tout seul (adresses des fichiers, image d'aperçu).
- Le site est servi dans le sous-dossier `/rayane-coaching/` : c'est géré automatiquement
  (`BASE_PATH` dans `vite.config.js`). Pour les photos, écris simplement `'/images/coach.jpg'`
  dans `src/config.js`.

### Sur Vercel ou Netlify (autre possibilité)

Importe le même dépôt GitHub sur vercel.com ou netlify.com : dossier racine `front`, commande
`npm run build`, dossier de sortie `dist`. Chaque `git push` met aussi le site à jour, avec une
adresse plus courte (ex. `rayane-coaching.vercel.app`), et le dépôt peut rester privé.

### Bon à savoir

Le site doit être en **https** (c'est le cas sur GitHub Pages, Vercel et Netlify) pour que la copie
automatique du message fonctionne.

- **Aperçu du lien** (WhatsApp, Instagram, Facebook) : image `public/og-image.png` (1200×630).
  Ces applis exigent une adresse complète : sur GitHub Pages et Vercel elle est trouvée
  automatiquement, ailleurs définis la variable d'environnement `SITE_URL`
  (ex. `https://rayanecoaching.com`) avant le build. Avec un domaine personnalisé sur Vercel,
  définis aussi `SITE_URL` pour qu'il soit utilisé.
- **Icônes** : `favicon.svg`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` +
  `site.webmanifest` (ajout à l'écran d'accueil).
- **Polices** (hébergées avec le site, aucun appel à Google Fonts) : **Lalezar** pour les titres et
  boutons (`font-display`), **Barlow Condensed italique** pour les chiffres, prix et le nom RAYANE
  (`font-num`), **IBM Plex Sans Arabic** pour le texte courant (`font-sans`).
- **Style** : « sport » — titres inclinés (classe `slant`, sens adapté à l'arabe et au français),
  lignes de vitesse (`speed-lines`), banderoles croisées, cartes et boutons arrondis.
- **Photo du coach** : dès que `coach.photo` est rempli dans `src/config.js`, elle remplace la fiche
  « programme » dessinée à côté du titre de l'accueil.
- `vercel.json` met les fichiers de `assets/` en cache longue durée (ils changent de nom à chaque build).
- Si tu ajoutes un pixel publicitaire ou des statistiques, mets à jour la page Confidentialité
  (`src/content.js` → `privacy`).
