/**
 * ════════════════════════════════════════════════════════════════════
 *  CONFIGURATION DU SITE
 *  Ce que le coach change souvent est ici : nom, contacts, prix des
 *  formules et questions du formulaire.
 *  Les textes des sections (accueil, services, FAQ…) sont dans src/content.js.
 * ════════════════════════════════════════════════════════════════════
 */

// ── Identité ────────────────────────────────────────────────────────
export const coach = {
  brand: 'RAYANE', // nom affiché dans le logo et le titre de l'onglet
  brandSuffix: 'COACHING',
  // Photo du coach (optionnelle) : place le fichier dans public/images/
  // puis indique son chemin, ex. '/images/coach.jpg'
  photo: '',
  // Présentation (optionnelle). Tant qu'elle est vide, la section « Ton coach » est masquée.
  bio: { ar: '', fr: '' },
  // Chiffres clés (optionnels), ex. { value: '5+', label: { ar: 'سنوات خبرة', fr: "ans d'expérience" } }
  stats: [],
}

// ── Transformations (optionnel) ─────────────────────────────────────
// Photos avant/après de VRAIS clients (avec leur accord). Place les images
// dans public/images/ puis ajoute une ligne par photo, ex. :
// { image: '/images/resultat-1.jpg', caption: { ar: '-8 كغ في 3 أشهر', fr: '-8 kg en 3 mois' } },
// Tant que la liste est vide, la section est masquée.
export const results = []

// ── Contacts ────────────────────────────────────────────────────────
export const contact = {
  // ⭐ Numéro WhatsApp du coach, format international, chiffres uniquement : ex. '213555123456'.
  //    Avec le numéro, le formulaire ouvre WhatsApp avec le message DÉJÀ ÉCRIT (le client n'a qu'à envoyer).
  whatsapp: '213784947235', // 0784 94 72 35
  // Lien WhatsApp du coach (lien du QR code). Utilisé tant que le numéro ci-dessus est vide :
  // WhatsApp n'accepte pas de message pré-rempli sur ce type de lien, donc le message est
  // copié automatiquement et le client le colle dans la conversation.
  whatsappLink: 'https://wa.me/qr/UGXCYES3KWYMP1',
  instagram: 'https://www.instagram.com/rayane_fit/',
  instagramHandle: 'rayane_fit',
  tiktok: '', // URL complète
  facebook: '', // URL complète
}

// ── Crédit développeur (pied de page) ───────────────────────────────
export const credit = {
  label: 'Developed by',
  name: 'cvkdev',
  url: 'https://www.instagram.com/cvkdev/',
}

// ── Paiement ────────────────────────────────────────────────────────
// Affiché au client juste après l'envoi du formulaire (seulement si rempli).
export const payment = {
  ccp: '', // ex. '0012345678 clé 90'
  baridimob: '', // RIP BaridiMob, ex. '00799999001234567890'
  holder: '', // titulaire du compte
}

// ── Formules & prix ─────────────────────────────────────────────────
// L'économie affichée (« وفّر … DA ») est calculée à partir du prix 1 mois.
// `formValue` = texte de l'option dans le Google Form (utile seulement si googleForm.enabled = true).
export const currency = 'DA'

export const plans = [
  {
    id: '1m',
    months: 1,
    price: 2900,
    name: { ar: 'شهر', fr: '1 mois' },
    label: { ar: 'شهر تمرين وتغذية', fr: '1 mois — entraînement + nutrition' },
    note: { ar: 'مثالية للبداية', fr: 'Idéal pour commencer' },
    formValue: 'شهر تمرين و تغذية - 2900 DA',
  },
  {
    id: '2m',
    months: 2,
    price: 5200,
    name: { ar: 'شهرين', fr: '2 mois' },
    label: { ar: 'شهرين تمرين وتغذية', fr: '2 mois — entraînement + nutrition' },
    formValue: 'شهرين تمرين و تغذية - 5200 DA',
  },
  {
    id: '3m',
    months: 3,
    price: 7900,
    name: { ar: '3 أشهر', fr: '3 mois' },
    label: { ar: '3 أشهر تمرين وتغذية', fr: '3 mois — entraînement + nutrition' },
    formValue: '3 اشهر تمرين و تغذية - 7900 DA',
  },
  {
    id: '4m',
    months: 4,
    price: 9500,
    name: { ar: '4 أشهر', fr: '4 mois' },
    label: { ar: '4 أشهر تمرين وتغذية', fr: '4 mois — entraînement + nutrition' },
    formValue: '4 اشهر تمرين و تغذية - 9500 DA',
    featured: true, // carte mise en avant
    badge: { ar: 'أفضل قيمة', fr: 'Le plus avantageux' },
  },
]

// ── Google Form (optionnel) ─────────────────────────────────────────
// Les réponses partent sur le WhatsApp du coach. Passe `enabled` à true pour
// AUSSI garder une copie de chaque inscription dans le Google Form du coach
// (pratique si un client remplit le formulaire mais n'appuie pas sur « Envoyer » dans WhatsApp).
export const googleForm = {
  enabled: false,
  action:
    'https://docs.google.com/forms/d/e/1FAIpQLSc12DhU1fpPutsM1NqzwefSTrG6eDAco0o2jvDFubw3oLJokQ/formResponse',
  // Bannière du formulaire (optionnelle) : place l'image dans public/images/,
  // ex. '/images/banniere.jpg'. Vide = bannière dessinée en HTML.
  bannerImage: '',
}

/**
 * Questions du formulaire (mêmes questions et même ordre que le Google Form du coach).
 * `label`  = question affichée sur le site
 * `short`  = libellé court utilisé dans le message WhatsApp (avec `emoji`)
 * `entry`  = identifiant du champ côté Google Form (sert seulement si googleForm.enabled)
 * `value`  = texte EXACT de l'option dans le Google Form
 * Types : plans · text · tel · email · age · body (poids + taille) · radio · textarea
 */
export const questions = [
  {
    id: 'plan',
    entry: 'entry.78486951',
    type: 'plans',
    required: true,
    emoji: '📦',
    short: { ar: 'الباقة', fr: 'Formule' },
    label: { ar: 'اختر الباقة المناسبة لك', fr: 'Choisis ta formule' },
  },
  {
    id: 'name',
    entry: 'entry.2005620554',
    type: 'text',
    required: true,
    autoComplete: 'name',
    emoji: '👤',
    short: { ar: 'الاسم', fr: 'Nom' },
    label: { ar: 'الاسم واللقب', fr: 'Nom et prénom' },
  },
  {
    id: 'phone',
    entry: 'entry.1166974658',
    type: 'tel',
    required: true,
    emoji: '📞',
    short: { ar: 'الهاتف', fr: 'Téléphone' },
    label: { ar: 'رقم الهاتف', fr: 'Numéro de téléphone' },
    help: {
      ar: 'يُفضّل رقم الواتساب، لأن التواصل والمتابعة يكونو عليه.',
      fr: 'De préférence ton numéro WhatsApp : tout le suivi se fait dessus.',
    },
    placeholder: { ar: '0X XX XX XX XX', fr: '0X XX XX XX XX' },
  },
  {
    id: 'email',
    entry: 'entry.1045781291',
    type: 'email',
    required: false,
    emoji: '✉️',
    short: { ar: 'البريد', fr: 'E-mail' },
    label: { ar: 'البريد الإلكتروني', fr: 'Adresse e-mail' },
    placeholder: { ar: 'exemple@gmail.com', fr: 'exemple@gmail.com' },
  },
  {
    id: 'age',
    entry: 'entry.1065046570',
    type: 'age',
    required: true,
    emoji: '🎂',
    short: { ar: 'العمر', fr: 'Âge' },
    label: { ar: 'العمر', fr: 'Âge' },
  },
  {
    id: 'body',
    entry: 'entry.1384264556',
    type: 'body',
    required: true,
    emoji: '⚖️',
    short: { ar: 'الوزن والطول', fr: 'Poids et taille' },
    label: { ar: 'الوزن والطول', fr: 'Poids et taille' },
  },
  {
    id: 'lifestyle',
    entry: 'entry.262477941',
    type: 'text',
    required: false,
    emoji: '💼',
    short: { ar: 'العمل والحياة', fr: 'Travail / mode de vie' },
    label: { ar: 'طبيعة العمل والحياة', fr: 'Travail et mode de vie' },
    help: {
      ar: 'مثلاً: خدمة مكتب، خدمة بدنية، طالب، أوقات الفراغ…',
      fr: 'Ex. : travail de bureau, travail physique, études, temps libre…',
    },
  },
  {
    id: 'goal',
    entry: 'entry.340924776',
    type: 'radio',
    required: true,
    emoji: '🎯',
    short: { ar: 'الهدف', fr: 'Objectif' },
    label: { ar: 'الهدف الرياضي', fr: 'Objectif sportif' },
    options: [
      { value: 'انقاص الوزن او التنشيف', label: { ar: 'إنقاص الوزن أو التنشيف', fr: 'Perte de poids ou sèche' } },
      { value: 'زيادة الوزن او التضخيم', label: { ar: 'زيادة الوزن أو التضخيم', fr: 'Prise de poids ou prise de masse' } },
      {
        value: 'هدف اخر',
        label: { ar: 'هدف آخر', fr: 'Autre objectif' },
        // Champ libre affiché si ce choix est coché
        detail: { ar: 'وضّح هدفك', fr: 'Précise ton objectif' },
      },
    ],
  },
  {
    id: 'injuries',
    entry: 'entry.1731483731',
    type: 'text',
    required: false,
    emoji: '🩹',
    short: { ar: 'الإصابات', fr: 'Blessures' },
    label: { ar: 'هل تعاني من إصابات حالية أو سابقة؟', fr: 'As-tu des blessures actuelles ou passées ?' },
  },
  {
    id: 'nutrition',
    entry: 'entry.1598686567',
    type: 'radio',
    required: true,
    emoji: '🥗',
    short: { ar: 'التغذية', fr: 'Nutrition' },
    label: { ar: 'بخصوص برنامج التغذية', fr: 'Pour la nutrition, tu préfères…' },
    // `message` = formulation du client dans le message WhatsApp (le libellé reste celui du coach)
    options: [
      {
        value: 'اعطيك برنامج وجبات كامل',
        label: { ar: 'أعطيك برنامج وجبات كامل', fr: 'Un plan de repas complet' },
        message: { ar: 'برنامج وجبات كامل', fr: 'Plan de repas complet' },
      },
      {
        value: 'اعطيك سعرات والماكروز وتختار وجباتك',
        label: { ar: 'أعطيك السعرات والماكروز وتختار وجباتك', fr: 'Mes calories et macros, je choisis mes repas' },
        message: { ar: 'السعرات والماكروز (نختار وجباتي وحدي)', fr: 'Calories et macros (je choisis mes repas)' },
      },
    ],
  },
  {
    id: 'sleep',
    entry: 'entry.774641081',
    type: 'radio',
    required: true,
    emoji: '😴',
    short: { ar: 'النوم', fr: 'Sommeil' },
    label: { ar: 'طبيعة نومك', fr: 'Ton sommeil (par nuit)' },
    options: [
      { value: 'اقل من 6 ساعات', label: { ar: 'أقل من 6 ساعات', fr: 'Moins de 6 h' } },
      { value: '6-8 ساعات', label: { ar: 'من 6 إلى 8 ساعات', fr: '6 à 8 h' } },
      { value: '8+ ساعات', label: { ar: 'أكثر من 8 ساعات', fr: 'Plus de 8 h' } },
    ],
  },
  {
    id: 'days',
    entry: 'entry.1768719744',
    type: 'radio',
    required: true,
    emoji: '📅',
    short: { ar: 'أيام التمرين', fr: 'Jours d’entraînement' },
    label: { ar: 'كم يوم تفضّل تتمرن في الأسبوع؟', fr: 'Combien de jours par semaine veux-tu t’entraîner ?' },
    help: { ar: 'لازم الالتزام بالعدد اللي تختارو.', fr: 'Tu t’engages à respecter le nombre choisi.' },
    options: [
      { value: '3 ايام', label: { ar: '3 أيام', fr: '3 jours' } },
      { value: '4 ايام', label: { ar: '4 أيام', fr: '4 jours' } },
      { value: '5 ايام', label: { ar: '5 أيام', fr: '5 jours' } },
      { value: '6 ايام', label: { ar: '6 أيام', fr: '6 jours' } },
      { value: 'يومين (حالة خاصة)', label: { ar: 'يومين (حالة خاصة)', fr: '2 jours (cas particulier)' } },
    ],
  },
  {
    id: 'extra',
    entry: 'entry.839337160',
    type: 'textarea',
    required: false,
    collectsNotes: true, // côté Google Form : reçoit aussi le détail « هدف آخر »
    emoji: '📝',
    short: { ar: 'إضافات', fr: 'À ajouter' },
    label: { ar: 'أي إضافات تحب تزيدها؟', fr: 'Quelque chose à ajouter ?' },
  },
]
