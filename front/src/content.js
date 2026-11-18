/**
 * Textes du site, en arabe (ar) et en français (fr).
 * Ton : la voix du coach (« je / nous »), en darja simple comme dans son formulaire.
 * Les infos qui changent souvent (prix, contacts, questions du formulaire) sont dans src/config.js.
 */

export const content = {
  meta: {
    title: {
      ar: 'تدريب أونلاين: تمارين، تغذية ومتابعة يومية',
      fr: 'Coaching en ligne : entraînement, nutrition et suivi',
    },
  },

  nav: {
    links: [
      { href: '#services', label: { ar: 'الخدمات', fr: 'Services' } },
      { href: '#how', label: { ar: 'كيفاش نخدمو', fr: 'Méthode' } },
      { href: '#pricing', label: { ar: 'الأسعار', fr: 'Tarifs' } },
      { href: '#faq', label: { ar: 'أسئلة', fr: 'FAQ' } },
    ],
    cta: { ar: 'سجّل الآن', fr: 'Je m’inscris' },
    instagram: { ar: 'إنستغرام', fr: 'Instagram' },
    openMenu: { ar: 'فتح القائمة', fr: 'Ouvrir le menu' },
    closeMenu: { ar: 'إغلاق القائمة', fr: 'Fermer le menu' },
  },

  hero: {
    kicker: { ar: 'كوتشينغ أونلاين مع ريان', fr: 'Coaching en ligne avec Rayane' },
    title1: { ar: 'أوصل لجسم أحلامك', fr: 'Atteins le corps de tes rêves' },
    title2: { ar: 'وصحة أفضل', fr: 'et une meilleure santé' },
    subtitle: {
      ar: 'نحضّرلك برنامج تمارين وتغذية على حساب جسمك ووقتك، ونتابعك كل يوم على الواتساب حتى توصل لهدفك.',
      fr: 'Je te prépare un programme d’entraînement et de nutrition adapté à ton corps et à ton emploi du temps, puis je t’accompagne chaque jour sur WhatsApp jusqu’à ce que tu atteignes ton objectif.',
    },
    ctaPrimary: { ar: 'اختار باقتك', fr: 'Choisis ta formule' },
    ctaSecondary: { ar: 'كيفاش نخدمو', fr: 'Comment ça marche' },
    // Chiffres clés sous les boutons (tirés des règles du coach)
    facts: [
      { value: { ar: '2–3', fr: '2–3' }, label: { ar: 'أيام وبرنامجك واجد', fr: 'jours pour recevoir ton programme' } },
      { value: { ar: 'يومياً', fr: 'Quotidien' }, label: { ar: 'متابعة على الواتساب', fr: 'suivi sur WhatsApp' } },
      { value: { ar: 'أسبوعياً', fr: 'Hebdo' }, label: { ar: 'قياسات ومتابعة التطور', fr: 'bilan et mensurations' } },
    ],
    // Fiche « programme » dessinée à côté du titre (remplacée par la photo du coach si coach.photo est rempli)
    sheet: {
      title: { ar: 'برنامجك', fr: 'Ton programme' },
      week: { ar: 'الأسبوع 01', fr: 'Semaine 01' },
      days: [
        { day: { ar: 'اليوم 1', fr: 'Jour 1' }, name: { ar: 'صدر وترايسبس', fr: 'Pecs & triceps' }, done: true },
        { day: { ar: 'اليوم 2', fr: 'Jour 2' }, name: { ar: 'ظهر وبايسبس', fr: 'Dos & biceps' }, done: true },
        { day: { ar: 'اليوم 3', fr: 'Jour 3' }, name: { ar: 'أرجل', fr: 'Jambes' } },
        { day: { ar: 'اليوم 4', fr: 'Jour 4' }, name: { ar: 'أكتاف وبطن', fr: 'Épaules & abdos' } },
      ],
      exercises: { ar: '5 تمارين', fr: '5 exercices' },
      macrosTitle: { ar: 'التغذية اليومية', fr: 'Nutrition / jour' },
      macros: [
        { label: { ar: 'سعرات', fr: 'kcal' }, value: '2450' },
        { label: { ar: 'بروتين', fr: 'Prot.' }, value: '180g' },
        { label: { ar: 'نشويات', fr: 'Gluc.' }, value: '260g' },
        { label: { ar: 'دهون', fr: 'Lip.' }, value: '70g' },
      ],
      sticker: { ar: 'متابعة يومية على الواتساب', fr: 'Suivi quotidien sur WhatsApp' },
    },
  },

  // Bandeau défilant sous l'accueil
  marquee: [
    { ar: 'تدريب أونلاين', fr: 'Coaching en ligne' },
    { ar: 'بناء عضلي', fr: 'Prise de muscle' },
    { ar: 'خسارة الدهون', fr: 'Perte de gras' },
    { ar: 'تغذية ومكملات', fr: 'Nutrition & compléments' },
    { ar: 'متابعة يومية', fr: 'Suivi quotidien' },
  ],

  services: {
    kicker: { ar: 'الخدمات', fr: 'Services' },
    title: { ar: 'تمارين، تغذية ومتابعة — كلش أونلاين', fr: 'Entraînement, nutrition et suivi — tout en ligne' },
    subtitle: {
      ar: 'ما كاين حتى برنامج جاهز: كل برنامج على حساب جسمك، هدفك والوقت اللي عندك.',
      fr: 'Aucun programme copié-collé : chaque plan dépend de ton corps, de ton objectif et du temps dont tu disposes.',
    },
    items: [
      {
        title: { ar: 'تدريب أونلاين', fr: 'Coaching en ligne' },
        text: {
          ar: 'برنامج تمارين مفصّل على حسب مستواك وعدد الأيام اللي تقدر تتمرن فيها.',
          fr: 'Un programme détaillé selon ton niveau et le nombre de jours où tu peux t’entraîner.',
        },
      },
      {
        title: { ar: 'بناء عضلي', fr: 'Prise de muscle' },
        text: {
          ar: 'زيادة الكتلة العضلية بطريقة مدروسة: تمارين، أحمال وتغذية تخدم التضخيم.',
          fr: 'Développe ta masse musculaire de façon structurée : exercices, charges et nutrition pensés pour la prise de masse.',
        },
      },
      {
        title: { ar: 'خسارة الدهون', fr: 'Perte de gras' },
        text: {
          ar: 'تنشيف وإنقاص الوزن بخطة واضحة وبلا حرمان، مع متابعة للقياسات.',
          fr: 'Sèche et perte de poids avec un plan clair, sans privation, et un suivi de tes mensurations.',
        },
      },
      {
        title: { ar: 'تغذية ومكملات', fr: 'Nutrition & compléments' },
        text: {
          ar: 'برنامج وجبات كامل، ولا سعرات وماكروز تختار بيهم وجباتك، مع توجيهات حول المكملات.',
          fr: 'Plan de repas complet ou calories et macros pour composer tes repas, avec des conseils sur les compléments.',
        },
      },
    ],
  },

  steps: {
    kicker: { ar: 'كيفاش نخدمو', fr: 'Méthode' },
    title: { ar: 'من التسجيل لأول حصة، في 4 مراحل', fr: 'De l’inscription à la première séance, en 4 étapes' },
    items: [
      {
        title: { ar: 'تختار الباقة وتعمّر الاستمارة', fr: 'Tu choisis ta formule et tu remplis le formulaire' },
        text: {
          ar: 'عمرك، وزنك، هدفك، نومك… إجاباتك توصلني مباشرة على الواتساب.',
          fr: 'Âge, poids, objectif, sommeil… tes réponses m’arrivent directement sur WhatsApp.',
        },
      },
      {
        title: { ar: 'تخلّص ببريدي موب ولا CCP', fr: 'Tu paies par BaridiMob ou CCP' },
        text: {
          ar: 'نأكدو الدفع مع بعض على الواتساب.',
          fr: 'On confirme le paiement ensemble sur WhatsApp.',
        },
      },
      {
        title: { ar: 'يوصلك برنامجك في 2 حتى 3 أيام', fr: 'Tu reçois ton programme sous 2 à 3 jours' },
        text: {
          ar: 'جداول التمارين والتغذية تكون واجدة، والاشتراك يبدا من النهار اللي توصلك فيه.',
          fr: 'Tes plannings d’entraînement et de nutrition sont prêts, et l’abonnement démarre le jour où tu les reçois.',
        },
      },
      {
        title: { ar: 'نتابعك كل يوم', fr: 'Je t’accompagne chaque jour' },
        text: {
          ar: 'نجاوبك على أي سؤال يومياً، وكل أسبوع نشوفو التطور والقياسات.',
          fr: 'Je réponds à tes questions chaque jour, et chaque semaine on fait le point sur tes progrès et tes mensurations.',
        },
      },
    ],
  },

  about: {
    eyebrow: { ar: 'المدرب', fr: 'Ton coach' },
  },

  results: {
    eyebrow: { ar: 'النتائج', fr: 'Résultats' },
    title: { ar: 'تحولات المتدربين', fr: 'Les transformations' },
  },

  pricing: {
    kicker: { ar: 'الأسعار', fr: 'Tarifs' },
    title: { ar: 'اختار المدة اللي تناسبك', fr: 'Choisis la durée qui te convient' },
    subtitle: {
      ar: 'نفس المرافقة في كل الباقات: برنامج تمارين، تغذية ومتابعة يومية. كي تطوّل المدة، توفّر أكثر.',
      fr: 'Le même accompagnement dans toutes les formules : entraînement, nutrition et suivi quotidien. Plus c’est long, plus tu économises.',
    },
    planSubtitle: { ar: 'تمرين + تغذية', fr: 'Entraînement + nutrition' },
    perksTitle: { ar: 'كل باقة فيها:', fr: 'Chaque formule comprend :' },
    save: { ar: 'توفّر', fr: 'Tu économises' },
    choose: { ar: 'نختار هذي', fr: 'Je prends celle-ci' },
    perks: [
      { ar: 'برنامج تمارين مخصّص لك', fr: 'Programme d’entraînement personnalisé' },
      { ar: 'تغذية: برنامج وجبات ولا ماكروز', fr: 'Nutrition : plan de repas ou macros' },
      { ar: 'متابعة يومية على الواتساب', fr: 'Suivi quotidien sur WhatsApp' },
      { ar: 'قياسات ومتابعة التطور كل أسبوع', fr: 'Bilan hebdo : progrès et mensurations' },
    ],
    notes: [
      { ar: 'الدفع ببريدي موب ولا CCP', fr: 'Paiement par BaridiMob ou CCP' },
      { ar: 'البرنامج واجد في 2–3 أيام بعد الدفع', fr: 'Programme prêt 2 à 3 jours après le paiement' },
      { ar: 'الاشتراك يبدا من نهار تستلم البرنامج', fr: 'L’abonnement démarre à la réception du programme' },
    ],
  },

  form: {
    banner: {
      line1: { ar: 'أوصل لجسم', fr: 'Atteins le corps' },
      line2: { ar: 'أحلامك وصحة أفضل', fr: 'de tes rêves et une meilleure santé' },
      tags: [
        { ar: 'تغذية ومكملات', fr: 'Nutrition & compléments' },
        { ar: 'خسارة الدهون', fr: 'Perte de gras' },
        { ar: 'بناء عضلي', fr: 'Prise de muscle' },
        { ar: 'تدريب أونلاين', fr: 'Coaching en ligne' },
      ],
    },
    title: { ar: 'معلومات عن التدريب', fr: 'Informations sur le coaching' },
    // Règles du coach, reprises du Google Form
    rules: [
      {
        ar: 'مدة الاشتراك تبدأ من النهار اللي توصلك فيه الجداول.',
        fr: 'L’abonnement démarre le jour où tu reçois tes plannings.',
      },
      {
        ar: 'الالتزام بالبرنامج ومواعيد المتابعة ضروري.',
        fr: 'Le respect du programme et des rendez-vous de suivi est indispensable.',
      },
      { ar: 'الدفع يكون عن طريق بريدي موب أو CCP.', fr: 'Paiement par BaridiMob ou CCP.' },
      {
        ar: 'الجداول تكون واجدة خلال 2 إلى 3 أيام بعد تأكيد الدفع.',
        fr: 'Les plannings sont prêts 2 à 3 jours après confirmation du paiement.',
      },
      { ar: 'كامل التواصل والمتابعة يكونو عبر الواتساب.', fr: 'Tous les échanges et le suivi se font sur WhatsApp.' },
      {
        ar: 'المتابعة يومية لأي سؤال أو استفسار، وكل أسبوع نديرو متابعة للتطورات والقياسات.',
        fr: 'Suivi quotidien pour toute question, et chaque semaine un point sur tes progrès et tes mensurations.',
      },
    ],
    requiredNote: { ar: '* يشير إلى سؤال إجباري', fr: '* Indique une question obligatoire' },
    draftNote: { ar: 'إجاباتك محفوظة على هذا الجهاز', fr: 'Tes réponses sont gardées sur cet appareil' },
    placeholder: { ar: 'إجابتك', fr: 'Ta réponse' },
    weight: { ar: 'الوزن', fr: 'Poids' },
    height: { ar: 'الطول', fr: 'Taille' },
    units: {
      kg: { ar: 'كغ', fr: 'kg' },
      cm: { ar: 'سم', fr: 'cm' },
      years: { ar: 'سنة', fr: 'ans' },
    },
    errors: {
      required: { ar: 'هذا السؤال إجباري', fr: 'Cette question est obligatoire' },
      phone: { ar: 'أدخل رقم هاتف صحيح', fr: 'Entre un numéro de téléphone valide' },
      email: { ar: 'أدخل بريداً إلكترونياً صحيحاً', fr: 'Entre une adresse e-mail valide' },
      age: { ar: 'أدخل عمراً صحيحاً', fr: 'Entre un âge valide' },
      body: { ar: 'أدخل وزناً وطولاً صحيحين', fr: 'Entre un poids et une taille valides' },
      summary: { ar: 'يرجى إكمال الأسئلة الإجبارية', fr: 'Merci de compléter les questions obligatoires' },
    },
    submit: { ar: 'إرسال على الواتساب', fr: 'Envoyer sur WhatsApp' },
    submitPlain: { ar: 'إرسال', fr: 'Envoyer' },
    sending: { ar: 'جاري الإرسال…', fr: 'Envoi en cours…' },
    clear: { ar: 'مسح الاستمارة', fr: 'Effacer le formulaire' },
    clearConfirm: { ar: 'هل تريد مسح كل الإجابات؟', fr: 'Effacer toutes tes réponses ?' },
    privacy: {
      ar: 'معلوماتك تُرسل مباشرة للكوتش على الواتساب، وتُستعمل فقط لتحضير برنامجك.',
      fr: 'Tes informations sont envoyées directement au coach sur WhatsApp et servent uniquement à préparer ton programme.',
    },
    // Message WhatsApp envoyé au coach (les réponses sont ajoutées en dessous)
    message: {
      intro: {
        ar: 'السلام عليكم كوتش 👋\nحاب نسجّل في التدريب أونلاين، هذي معلوماتي:',
        fr: 'Bonjour coach 👋\nJe souhaite m’inscrire au coaching en ligne, voici mes infos :',
      },
    },
    failure: {
      ar: 'تعذّر إرسال الطلب. تحقق من اتصالك بالإنترنت وحاول مرة أخرى.',
      fr: 'Impossible d’envoyer ta demande. Vérifie ta connexion et réessaie.',
    },
    failureWhatsapp: { ar: 'أو ابعث معلوماتك على الواتساب', fr: 'ou envoie tes infos sur WhatsApp' },
    success: {
      // Avec le numéro du coach : WhatsApp s'ouvre avec le message déjà écrit
      prefillTitle: { ar: 'آخر خطوة: اضغط «إرسال» في الواتساب', fr: 'Dernière étape : appuie sur « Envoyer » dans WhatsApp' },
      prefillText: {
        ar: 'تفتحت محادثة الكوتش ورسالتك مكتوبة فيها. إذا ما تفتحتش، اضغط على «فتح الواتساب».',
        fr: 'La conversation avec le coach s’est ouverte avec ton message déjà écrit. Sinon, appuie sur « Ouvrir WhatsApp ».',
      },
      // Avec le lien QR : le message est copié, le client le colle dans la conversation
      copyTitle: { ar: 'آخر خطوة: ابعث رسالتك للكوتش على الواتساب', fr: 'Dernière étape : envoie ton message au coach sur WhatsApp' },
      copySteps: [
        { ar: 'اضغط على «فتح الواتساب» باش تتفتح محادثة الكوتش.', fr: 'Appuie sur « Ouvrir WhatsApp » pour ouvrir la conversation avec le coach.' },
        { ar: 'الصق الرسالة في المحادثة — رسالتك منسوخة.', fr: 'Colle le message dans la conversation : il est déjà copié.' },
        { ar: 'اضغط «إرسال».', fr: 'Appuie sur « Envoyer ».' },
      ],
      open: { ar: 'فتح الواتساب', fr: 'Ouvrir WhatsApp' },
      copy: { ar: 'نسخ الرسالة', fr: 'Copier le message' },
      copied: { ar: 'تم النسخ ✓', fr: 'Copié ✓' },
      preview: { ar: 'رسالتك', fr: 'Ton message' },
      // Sans WhatsApp configuré (Google Form seulement)
      sentTitle: { ar: 'تم إرسال طلبك بنجاح', fr: 'Ta demande a bien été envoyée' },
      afterTitle: { ar: 'بعد الإرسال', fr: 'Ensuite' },
      steps: [
        { ar: 'الدفع عبر بريدي موب أو CCP.', fr: 'Paiement par BaridiMob ou CCP.' },
        {
          ar: 'تأكيد الدفع والمتابعة كاملة يكونو على الواتساب.',
          fr: 'La confirmation du paiement et tout le suivi se font sur WhatsApp.',
        },
        {
          ar: 'برنامجك يكون واجد خلال 2 إلى 3 أيام بعد تأكيد الدفع.',
          fr: 'Ton programme est prêt 2 à 3 jours après confirmation du paiement.',
        },
      ],
      paymentTitle: { ar: 'معلومات الدفع', fr: 'Coordonnées de paiement' },
      holder: { ar: 'الاسم', fr: 'Titulaire' },
      edit: { ar: 'تعديل المعلومات', fr: 'Modifier mes réponses' },
      again: { ar: 'تسجيل جديد', fr: 'Nouvelle inscription' },
    },
  },

  faq: {
    kicker: { ar: 'أسئلة', fr: 'FAQ' },
    title: { ar: 'أسئلة يسقسوها بزاف', fr: 'Les questions qu’on me pose souvent' },
    asideTitle: { ar: 'ما لقيتش الجواب؟', fr: 'Pas trouvé ta réponse ?' },
    asideText: {
      ar: 'ابعثلي سؤالك على الواتساب، نجاوبك بنفسي.',
      fr: 'Envoie-moi ta question sur WhatsApp, je te réponds moi-même.',
    },
    asideButton: { ar: 'سقسيني على الواتساب', fr: 'Me poser une question' },
    items: [
      {
        q: { ar: 'وقتاش يبدا الاشتراك تاعي؟', fr: 'Quand commence mon abonnement ?' },
        a: {
          ar: 'الاشتراك يبدا من النهار اللي توصلك فيه الجداول (برنامج التمارين والتغذية)، ماشي من نهار الدفع.',
          fr: 'Ton abonnement démarre le jour où tu reçois tes plannings (entraînement et nutrition), pas le jour du paiement.',
        },
      },
      {
        q: { ar: 'كيفاش نخلّص؟', fr: 'Comment se fait le paiement ?' },
        a: {
          ar: 'تخلّص ببريدي موب (BaridiMob) ولا CCP، ونأكدو الدفع مع بعض على الواتساب.',
          fr: 'Le paiement se fait par BaridiMob ou CCP, et on le confirme ensemble sur WhatsApp.',
        },
      },
      {
        q: { ar: 'وقتاش يوصلني البرنامج؟', fr: 'Quand vais-je recevoir mon programme ?' },
        a: {
          ar: 'الجداول يكونو واجدين في 2 حتى 3 أيام بعد تأكيد الدفع.',
          fr: 'Tes plannings sont prêts 2 à 3 jours après la confirmation du paiement.',
        },
      },
      {
        q: { ar: 'كيفاش تكون المتابعة؟', fr: 'Comment se passe le suivi ?' },
        a: {
          ar: 'كامل التواصل والمتابعة يكونو على الواتساب: كل يوم نجاوبك على أي سؤال، وكل أسبوع نشوفو التطور والقياسات.',
          fr: 'Tout se passe sur WhatsApp : je réponds à tes questions chaque jour, et chaque semaine on fait le point sur tes progrès et tes mensurations.',
        },
      },
      {
        q: { ar: 'نقدر نختار وجباتي وحدي؟', fr: 'Puis-je choisir mes repas moi-même ?' },
        a: {
          ar: 'إيه. تختار بين برنامج وجبات كامل، ولا السعرات والماكروز وتختار وجباتك وحدك.',
          fr: 'Oui : tu choisis entre un plan de repas complet, ou tes calories et macros pour composer tes repas toi-même.',
        },
      },
      {
        q: { ar: 'شحال من يوم لازم نتمرن في الأسبوع؟', fr: 'Combien de jours par semaine dois-je m’entraîner ?' },
        a: {
          ar: 'تختار بين 3 و6 أيام في الأسبوع (يومين في حالات خاصة). المهم هو الالتزام بالعدد اللي تختارو.',
          fr: 'Tu choisis entre 3 et 6 jours par semaine (2 jours dans des cas particuliers). L’essentiel : respecter le rythme choisi.',
        },
      },
      {
        q: { ar: 'واش لازم مني باش نوصل للنتيجة؟', fr: 'Qu’est-ce qu’on attend de moi ?' },
        a: {
          ar: 'الالتزام بالبرنامج ومواعيد المتابعة ضروري — هو اللي يفرق بين اللي يوصل لهدفو واللي لا.',
          fr: 'Le respect du programme et des rendez-vous de suivi est indispensable : c’est ce qui fait la différence.',
        },
      },
    ],
  },

  cta: {
    title: { ar: 'جاهز تبدا؟', fr: 'Prêt à commencer ?' },
    subtitle: {
      ar: 'عمّر الاستمارة في دقيقتين، وبرنامجك يكون واجد في 2 حتى 3 أيام بعد الدفع.',
      fr: 'Remplis le formulaire en 2 minutes : ton programme est prêt 2 à 3 jours après le paiement.',
    },
    button: { ar: 'سجّل الآن', fr: 'Je m’inscris' },
    whatsapp: { ar: 'راسلني على الواتساب', fr: 'Écris-moi sur WhatsApp' },
  },

  footer: {
    tagline: { ar: 'تدريب أونلاين · تمارين · تغذية · متابعة', fr: 'Coaching en ligne · Entraînement · Nutrition · Suivi' },
    rights: { ar: 'جميع الحقوق محفوظة.', fr: 'Tous droits réservés.' },
  },

  // Page « Confidentialité » (s'ouvre avec le lien #privacy). À faire valider par le coach.
  // ⚠️ Si tu ajoutes un pixel publicitaire ou des statistiques, mets à jour la partie « tracking ».
  privacy: {
    link: { ar: 'سياسة الخصوصية', fr: 'Confidentialité' },
    title: { ar: 'سياسة الخصوصية', fr: 'Politique de confidentialité' },
    updated: { ar: 'آخر تحديث: نوفمبر 2026', fr: 'Dernière mise à jour : novembre 2026' },
    close: { ar: 'إغلاق', fr: 'Fermer' },
    sections: [
      {
        title: { ar: 'المعلومات المطلوبة', fr: 'Les informations demandées' },
        text: {
          ar: 'الاستمارة تطلب معلومات تساعد على تحضير برنامجك: الاسم، الهاتف، العمر، الوزن والطول، الهدف، النوم، الإصابات… البريد الإلكتروني اختياري.',
          fr: 'Le formulaire demande des informations utiles pour préparer ton programme : nom, téléphone, âge, poids et taille, objectif, sommeil, blessures… L’e-mail est facultatif.',
        },
      },
      {
        title: { ar: 'كيف تُرسل', fr: 'Comment elles sont envoyées' },
        text: {
          ar: 'الموقع ما يخزّنش معلوماتك على أي سيرفر. عند الضغط على «إرسال على الواتساب» تتحضّر رسالة فيها إجاباتك، وما توصل للكوتش حتى تضغط أنت «إرسال» في الواتساب.',
          fr: 'Le site ne stocke pas tes informations sur un serveur. Quand tu cliques sur « Envoyer sur WhatsApp », un message contenant tes réponses est préparé : il n’arrive au coach que lorsque tu appuies toi-même sur « Envoyer » dans WhatsApp.',
        },
      },
      {
        // Affiché seulement si la copie Google Form est activée (googleForm.enabled)
        onlyIfGoogleForm: true,
        title: { ar: 'نسخة احتياطية', fr: 'Copie de sauvegarde' },
        text: {
          ar: 'نسخة من إجاباتك تُحفظ كذلك في استمارة Google خاصة بالكوتش.',
          fr: 'Une copie de tes réponses est aussi enregistrée dans un formulaire Google privé du coach.',
        },
      },
      {
        title: { ar: 'على جهازك', fr: 'Sur ton appareil' },
        text: {
          ar: 'باش ما تضيعش إجاباتك، تبقى محفوظة في متصفحك على هذا الجهاز فقط. تقدر تمسحها في أي وقت بزر «مسح الاستمارة».',
          fr: 'Pour ne pas perdre tes réponses, elles restent enregistrées dans ton navigateur, sur cet appareil uniquement. Tu peux les effacer à tout moment avec « Effacer le formulaire ».',
        },
      },
      {
        title: { ar: 'الاستعمال', fr: 'Utilisation' },
        text: {
          ar: 'معلوماتك تُستعمل فقط لتحضير برنامجك ومتابعتك، وما تُعطى لحتى واحد.',
          fr: 'Tes informations servent uniquement à préparer ton programme et ton suivi. Elles ne sont ni vendues ni partagées.',
        },
      },
      {
        title: { ar: 'بدون تتبّع', fr: 'Pas de pistage' },
        text: {
          ar: 'الموقع ما يستعملش كوكيز إشهارية ولا أدوات تتبّع.',
          fr: 'Le site n’utilise ni cookies publicitaires ni outils de pistage.',
        },
      },
      {
        title: { ar: 'حذف معلوماتك', fr: 'Supprimer tes informations' },
        text: {
          ar: 'تقدر تطلب حذف معلوماتك في أي وقت عبر الواتساب أو إنستغرام.',
          fr: 'Tu peux demander la suppression de tes informations à tout moment sur WhatsApp ou Instagram.',
        },
      },
    ],
  },

  instagram: {
    kicker: { ar: 'إنستغرام', fr: 'Instagram' },
    title: { ar: 'تابعني على إنستغرام', fr: 'Suis-moi sur Instagram' },
    text: {
      ar: 'شوف المحتوى والستوريات، وراسلني مباشرة إذا عندك سؤال.',
      fr: 'Découvre mon contenu et mes stories, et écris-moi directement si tu as une question.',
    },
    button: { ar: 'تابعني', fr: 'Me suivre' },
  },

  whatsapp: {
    floatLabel: { ar: 'تواصل على الواتساب', fr: 'Contacter sur WhatsApp' },
    defaultMessage: {
      ar: 'السلام عليكم، عندي سؤال على التدريب أونلاين.',
      fr: 'Bonjour, j’ai une question sur le coaching en ligne.',
    },
  },
}
