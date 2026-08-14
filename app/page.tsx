'use client';

import { useState, useEffect, useRef } from 'react';

const translations = {
  ar: {
    title: "مشكاة الهداية",
    subtitle: "تصميم وبرمجة: عبد الرحمان بن قرعة • ولاية بسكرة، الجزائر",
    searchPlaceholder: "ابحث في الأذكار، العناوين، أو المصادر بدقة...",
    localTime: "التوقيت المحلي",
    prayerTimes: "مواقيت الصلاة لولاية بسكرة",
    fajr: "الفجر",
    dhuhr: "الظهر",
    asr: "العصر",
    maghrib: "المغرب",
    isha: "العشاء",
    tasbeehTitle: "📿 السبحة الرقمية",
    tasbeehSub: "انقر في أي مكان للتسبيح",
    tasbeehBtn: "سبحان الله 🤲",
    reset: "تصفير",
    globalCounter: "🌐 عداد المسلمين العالمي:",
    achievements: "🏅 أوسمة الإنجاز",
    atmosphere: "🎧 أجواء خاشعة",
    silent: "صامت",
    rain: "🌧️ مطر",
    nature: "🌲 طبيعة",
    aiAssistant: "🤖 المساعد الذكي",
    aiPlaceholder: "اكتب سؤالك هنا...",
    aiBtn: "اسأل المساعد الذكي 🧠",
    settings: "الإعدادات والميزات",
    close: "إغلاق",
    copy: "نسخ",
    card: "بطاقة",
    completed: "✔️ تمت القراءة",
    markComplete: "تحديد كـ تمت القراءة",
    streak: "الاستمرارية",
    favorites: "❤️ المفضلة المحفوظة"
  },
  fr: {
    title: "Mishkat Al-Hidaya",
    subtitle: "Conception et programmation : Abderrahmane Benkara • Biskra, Algérie",
    searchPlaceholder: "Rechercher dans les adhkar, titres ou sources...",
    localTime: "Heure locale",
    prayerTimes: "Horaires des prières - Biskra",
    fajr: "Fajr",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",
    tasbeehTitle: "📿 Chapelet Numérique",
    tasbeehSub: "Cliquez n'importe où pour louer",
    tasbeehBtn: "Subhanallah 🤲",
    reset: "Réinitialiser",
    globalCounter: "🌐 Compteur mondial :",
    achievements: "🏅 Réalisations",
    atmosphere: "🎧 Ambiance sereine",
    silent: "Silencieux",
    rain: "🌧️ Pluie",
    nature: "🌲 Nature",
    aiAssistant: "🤖 Assistant Intelligent",
    aiPlaceholder: "Posez votre question...",
    aiBtn: "Demander à l'IA 🧠",
    settings: "Paramètres",
    close: "Fermer",
    copy: "Copier",
    card: "Carte",
    completed: "✔️ Lu",
    markComplete: "Marquer comme lu",
    streak: "Série",
    favorites: "❤️ Favoris"
  },
  en: {
    title: "Mishkat Al-Hidaya",
    subtitle: "Designed & Coded by: Abderrahmane Benkara • Biskra, Algeria",
    searchPlaceholder: "Search adhkar, titles, or sources...",
    localTime: "Local Time",
    prayerTimes: "Prayer Times for Biskra",
    fajr: "Fajr",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",
    tasbeehTitle: "📿 Digital Tasbeeh",
    tasbeehSub: "Tap anywhere to praise",
    tasbeehBtn: "Subhanallah 🤲",
    reset: "Reset",
    globalCounter: "🌐 Global Counter:",
    achievements: "🏅 Achievements",
    atmosphere: "🎧 Peaceful Ambiance",
    silent: "Silent",
    rain: "🌧️ Rain",
    nature: "🌲 Nature",
    aiAssistant: "🤖 Smart Assistant",
    aiPlaceholder: "Type your question...",
    aiBtn: "Ask AI Assistant 🧠",
    settings: "Settings & Tools",
    close: "Close",
    copy: "Copy",
    card: "Card",
    completed: "✔️ Completed",
    markComplete: "Mark as completed",
    streak: "Streak",
    favorites: "❤️ Favorites"
  }
};

const adhkarDatabase = [
  { id: 1, title: 'آية الكرسي', content: '{اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تأخذُهُ سِنَةٌ وَلَا نَوْمٌ...}', source: 'النسائي، صححه الألباني.', category: 'أذكار الصباح' },
  { id: 2, title: 'الإخلاص والمعوذات', content: 'سورة الإخلاص، الفلق، والناس (3 مرات)', source: 'أبو داود والترمذي.', category: 'أذكار الصباح' },
  { id: 3, title: 'دعاء الصباح الأساسي', content: '"أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له..."', source: 'مسلم (2723).', category: 'أذكار الصباح' },
  { id: 4, title: 'دعاء الاستعانة', content: '"اللهم بك أصبحنا، وبك أمسينا، وبك نحيا، وبك نموت، وإليك النشور."', source: 'الترمذي (3391).', category: 'أذكار الصباح' },
  { id: 5, title: 'سيد الاستغفار', content: '"اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك..."', source: 'البخاري (6306).', category: 'أذكار الصباح' },
  { id: 6, title: 'دعاء الإشهاد (4 مرات)', content: '"اللهم إني أصبحت أشهِدك، وأشهِد حملة عرشك، وملائكتك..."', source: 'أبو داود والنسائي.', category: 'أذكار الصباح' },
  { id: 7, title: 'دعاء النعم', content: '"اللهم ما أصبح بي من نعمة أو بأحد من خلقك فمنك وحدك لا شريك لك..."', source: 'أبو داود وحسنه ابن باز.', category: 'أذكار الصباح' },
  { id: 8, title: 'دعاء العافية (3 مرات)', content: '"اللهم عافني في بدني، اللهم عافني في سمعي، اللهم عافني في بصري..."', source: 'أبو داود وصححه الألباني.', category: 'أذكار الصباح' },
  { id: 9, title: 'دعاء الحفظ والستر', content: '"اللهم إني أسألك العفو والعافية في الدنيا والآخرة..."', source: 'أبو داود وصححه الألباني.', category: 'أذكار الصباح' },
  { id: 10, title: 'دعاء الكفاية (7 مرات)', content: '"حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم."', source: 'أبو داود وصحح إسناده الأرناؤوط.', category: 'أذكار الصباح' },
  { id: 11, title: 'دعاء السلامة (3 مرات)', content: '"بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء..."', source: 'أبو داود والترمذي وصححه الألباني.', category: 'أذكار الصباح' },
  { id: 12, title: 'دعاء الرضا (3 مرات)', content: '"رضيت بالله رباً، وبالإسلام ديناً، وبمحمد صلى الله عليه وسلم نبياً."', source: 'أبو داود والترمذي وصححه الألباني.', category: 'أذكار الصباح' },
  { id: 13, title: 'دعاء صلاح الحال', content: '"يا حي يا قيوم برحمتك أستغيث، أصلح لي شأني كله..."', source: 'النسائي والحاكم وصححه الألباني.', category: 'أذكار الصباح' },
  { id: 14, title: 'دعاء الفطرة', content: '"أصبحنا على فطرة الإسلام، وعلى كلمة الإخلاص..."', source: 'أحمد وصححه الألباني.', category: 'أذكار الصباح' },
  { id: 15, title: 'التسبيح والتهليل', content: '100 مرة: "سبحان الله وبحمده".', source: 'مسلم وأبو داود.', category: 'أذكار الصباح' },

  { id: 16, title: 'آية الكرسي (مساءً)', content: '{اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...}', source: 'النسائي.', category: 'أذكار المساء' },
  { id: 17, title: 'الإخلاص والمعوذات (مساءً)', content: 'سورة الإخلاص، الفلق، والناس (3 مرات)', source: 'أبو داود والترمذي.', category: 'أذكار المساء' },
  { id: 18, title: 'دعاء المساء الأساسي', content: '"أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له..."', source: 'مسلم (2723).', category: 'أذكار المساء' },
  { id: 19, title: 'دعاء الاستعانة (مساءً)', content: '"اللهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير."', source: 'الترمذي (3391).', category: 'أذكار المساء' },
  { id: 20, title: 'سيد الاستغفار (مساءً)', content: '"اللهم أنت ربي لا إله إلا أنت..."', source: 'البخاري (6306).', category: 'أذكار المساء' },
  { id: 21, title: 'دعاء الإشهاد (مساءً - 4 مرات)', content: '"اللهم إني أمسيت أشهِدك، وأشهِد حملة عرشك..."', source: 'أبو داود والنسائي.', category: 'أذكار المساء' },
  { id: 22, title: 'دعاء النعم (مساءً)', content: '"اللهم ما أمسى بي من نعمة أو بأحد من خلقك فمنك وحدك..."', source: 'أبو داود وحسنه ابن باز.', category: 'أذكار المساء' },
  { id: 23, title: 'دعاء العافية (مساءً - 3 مرات)', content: '"اللهم عافني في بدني، اللهم عافني في سمعي..."', source: 'أبو داود وصححه الألباني.', category: 'أذكار المساء' },
  { id: 24, title: 'دعاء الحفظ والستر (مساءً)', content: '"اللهم إني أسألك العفو والعافية في الدنيا والآخرة..."', source: 'أبو داود وصححه الألباني.', category: 'أذكار المساء' },
  { id: 25, title: 'دعاء الكفاية (مساءً - 7 مرات)', content: '"حسبي الله لا إله إلا هو عليه توكلت..."', source: 'أبو داود.', category: 'أذكار المساء' },
  { id: 26, title: 'دعاء السلامة (مساءً - 3 مرات)', content: '"بسم الله الذي لا يضر مع اسمه شيء..."', source: 'أبو داود والترمذي.', category: 'أذكار المساء' },
  { id: 27, title: 'دعاء الرضا (مساءً - 3 مرات)', content: '"رضيت بالله رباً، وبالإسلام ديناً..."', source: 'أبو داود والترمذي.', category: 'أذكار المساء' },
  { id: 28, title: 'دعاء صلاح الحال (مساءً)', content: '"يا حي يا قيوم برحمتك أستغيث..."', source: 'النسائي.', category: 'أذكار المساء' },
  { id: 29, title: 'دعاء الفطرة (مساءً)', content: '"أمسينا على فطرة الإسلام، وعلى كلمة الإخلاص..."', source: 'أحمد.', category: 'أذكار المساء' },
  { id: 30, title: 'الزيادة الخاصة بالمساء (3 مرات)', content: '"أعوذ بكلمات الله التامات من شر ما خلق".', source: 'مسلم (2709).', category: 'أذكار المساء' },
  { id: 31, title: 'التسبيح والتهليل (مساءً)', content: '100 مرة: "سبحان الله وبحمده".', source: 'مسلم.', category: 'أذكار المساء' },

  { id: 44, title: 'نفث المعوذات', content: 'النفث في الكفين وقراءة المعوذات الثلاث ثم المسح على الجسد.', source: 'البخاري (5017).', category: 'النوم والاستيقاظ' },
  { id: 45, title: 'آية الكرسي قبل النوم', content: '{اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...}', source: 'البخاري (2311).', category: 'النوم والاستيقاظ' },
  { id: 46, title: 'دعاء النوم الأساسي', content: '"باسمك ربي وضعت جنبي، وبك أرفعه، إن أمسكت نفسي فارحمها..."', source: 'البخاري (6320).', category: 'النوم والاستيقاظ' },
  { id: 47, title: 'التفويض قبل النوم', content: '"اللهم أسلمت نفسي إليك، ووجهت وجهي إليك، وفوضت أمري إليك..."', source: 'البخاري (247).', category: 'النوم والاستيقاظ' },
  { id: 48, title: 'الوقاية من الفزع', content: '"أعوذ بكلمات الله التامات من غضبه وعقابه، وشر عباده، ومن همزات الشياطين..."', source: 'أبو داود (3893).', category: 'النوم والاستيقاظ' },
  { id: 49, title: 'دعاء الاستيقاظ من النوم', content: '"الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور."', source: 'البخاري (6312).', category: 'النوم والاستيقاظ' },
  { id: 50, title: 'الاستيقاظ والذكر ليلاً', content: '"لا إله إلا الله وحده لا شريك له، له الملك وله الحمد..."', source: 'البخاري (1154).', category: 'النوم والاستيقاظ' },

  { id: 51, title: 'دعاء الخروج', content: '"بسم الله، توكلت على الله، ولا حول ولا قوة إلا بالله."', source: 'أبو داود (5095).', category: 'الخروج والسفر' },
  { id: 52, title: 'دعاء دخول المنزل', content: '"بسم الله ولجنا، وبسم الله خرجنا، وعلى ربنا توكلنا."', source: 'أبو داود (5096).', category: 'الخروج والسفر' },
  { id: 53, title: 'دعاء الركوب', content: '"بسم الله، والحمد لله، {سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ}..."', source: 'أبو داود (2602).', category: 'الخروج والسفر' },
  { id: 54, title: 'دعاء العودة من السفر', content: '"آيبون، تائبون، عابدون، لربنا حامدون."', source: 'مسلم (1345).', category: 'الخروج والسفر' },
  { id: 55, title: 'دعاء دخول السوق', content: '"لا إله إلا الله وحده لا شريك له، له الملك وله الحمد، يحيي ويميت..."', source: 'الترمذي (3428).', category: 'الخروج والسفر' },
  { id: 56, title: 'دعاء دخول القرية', content: '"اللهم رب السماوات السبع وما أظللن، ورب الأرضين السبع وما أقللن..."', source: 'النسائي (542).', category: 'الخروج والسفر' },
  { id: 57, title: 'دعاء النزول في مكان', content: '"أعوذ بكلمات الله التامات من شر ما خلق."', source: 'مسلم (2708).', category: 'الخروج والسفر' },

  { id: 32, title: 'دعاء قضاء الديون', content: '"اللهم إني أعوذ بك من الهم والحزن، والعجز والكسل، والبخل والجبن، وغلبة الدين وقهر الرجال."', source: 'البخاري (6369).', category: 'الرزق وقضاء الدين' },
  { id: 33, title: 'طلب الكفاية من الحلال', content: '"اللهم اكفني بحلالك عن حرامك، وأغنني بفضلك عمن سواك."', source: 'الترمذي (3563).', category: 'الرزق وقضاء الدين' },
  { id: 34, title: 'البركة في الثمر والمدينة', content: '"اللهم بارك لنا في ثمرنا، وبارك لنا في مدينتنا، وبارك لنا في صاعنا، وبارك لنا في مدنا."', source: 'مسلم (1373).', category: 'الرزق وقضاء الدين' },
  { id: 35, title: 'الاستغفار للرزق', content: '"استغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه."', source: 'أبو داود والترمذي.', category: 'الرزق وقضاء الدين' },
  { id: 36, title: 'جلب الخير الشامل', content: '"اللهم إني أسألك من الخير كله عاجله وآجله، ما علمت منه وما لم أعلم..."', source: 'ابن ماجه (3846).', category: 'الرزق وقضاء الدين' },
  { id: 37, title: 'البركة في الأهل والمال', content: '"اللهم بارك لي في أهلي ومالي، وبارك لي فيما رزقتني وقنعي به."', source: 'ثبتت صيغ عديدة.', category: 'الرزق وقضاء الدين' },
  { id: 38, title: 'طلب العلم والرزق', content: '"اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً."', source: 'ابن ماجه (925).', category: 'الرزق وقضاء الدين' },

  { id: 58, title: 'دعاء الكرب (ذي النون)', content: '"لا إله إلا أنت سبحانك إني كنت من الظالمين."', source: 'الترمذي (3505).', category: 'الكرب والهم' },
  { id: 59, title: 'عظمة الله وتفريج الكرب', content: '"لا إله إلا الله العظيم الحليم، لا إله إلا الله رب العرش العظيم..."', source: 'البخاري (6346).', category: 'الكرب والهم' },
  { id: 60, title: 'الهم والحزن', content: '"اللهم إني عبدك ابن عبدك، ابن أمتك، ناصيتي بيدك، ماض في حكمك..."', source: 'أحمد (3712).', category: 'الكرب والهم' },
  { id: 61, title: 'صلاح الحال', content: '"يا حي يا قيوم برحمتك أستغيث، أصلح لي شأني كله، ولا تكلني إلى نفسي طرفة عين."', source: 'النسائي (10372).', category: 'الكرب والهم' },
  { id: 62, title: 'التوكل عند الصعاب', content: '"اللهم لا سهل إلا ما جعلته سهلاً، وأنت تجعل الحزن إذا شئت سهلاً."', source: 'ابن حبان.', category: 'الكرب والهم' },
  { id: 63, title: 'الاستخارة', content: '"اللهم إني أستخيرك بعلمك، وأستقدرك بقدرتك، وأسألك من فضلك العظيم..."', source: 'البخاري (1166).', category: 'الكرب والهم' },
  { id: 64, title: 'دفع سوء القضاء', content: '"اللهم إني أعوذ بك من زوال نعمتك، وتحول عافيتك، وفجاءة نقمتك..."', source: 'مسلم (2739).', category: 'الكرب والهم' },

  { id: 65, title: 'العافية في الجوارح', content: '"اللهم عافني في بدني، اللهم عافني في سمعي، اللهم عافني في بصري، لا إله إلا أنت."', source: 'أبو داود (5090)، وأحمد، وصححه الألباني.', category: 'الصحة والعافية' },
  { id: 66, title: 'الحفظ الشامل من الأضرار', content: '"بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم."', source: 'أبو داود (5088)، والترمذي (3388)، وصححه الألباني.', category: 'الصحة والعافية' },
  { id: 67, title: 'الشفاء للمريض', content: '"اللهم رب الناس أذهب البأس، اشفِ أنت الشافي، لا شفاء إلا شفاؤك، شفاءً لا يغادر سقماً."', source: 'البخاري (5743)، ومسلم (2191).', category: 'الصحة والعافية' },
  { id: 68, title: 'الرقية من الأوجاع', content: 'يضع يده على موضع الألم ويقول: "بسم الله" (3 مرات), ثم "أعوذ بالله وقدرته من شر ما أجد وأحاذر" (7 مرات).', source: 'مسلم (2202).', category: 'الصحة والعافية' },
  { id: 69, title: 'الاستعاذة من الأمراض', content: '"اللهم إني أعوذ بك من البرص، والجنون، والجذام، ومن سيئ الأسقام."', source: 'أبو داود (1554)، والنسائي (5493).', category: 'الصحة والعافية' },
  { id: 70, title: 'التحصين من العين والحسد', content: '"أعوذ بكلمات الله التامة، من كل شيطان وهامة، ومن كل عين لامة."', source: 'البخاري (3371).', category: 'الصحة والعافية' },
  { id: 71, title: 'العافية في الدنيا والآخرة', content: '"اللهم إني أسألك العافية في الدنيا والآخرة، اللهم إني أسألك العفو والعافية في ديني ودنياي وأهلي ومالي."', source: 'أبو داود (5074)، وصححه الألباني.', category: 'الصحة والعافية' },
  { id: 72, title: 'الاستشفاء بالقرآن', content: 'قراءة سورة الفاتحة، وسورة الإخلاص، والمعوذتين والنفث على المريض أو على ماء.', source: 'البخاري (5736)، ومسلم (2201).', category: 'الصحة والعافية' },

  { id: 39, title: 'تيسير الفهم', content: '"اللهم لا سهل إلا ما جعلته سهلاً، وأنت تجعل الحزن إذا شئت سهلاً."', source: 'ابن حبان (2427).', category: 'الدراسة والتحصيل' },
  { id: 40, title: 'طلب العلم', content: '"رَبِّ زِدْنِي عِلْماً."', source: 'سورة طه: 114.', category: 'الدراسة والتحصيل' },
  { id: 41, title: 'التوكل عند الشدائد', content: '"حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم."', source: 'أبو داود.', category: 'الدراسة والتحصيل' },
  { id: 42, title: 'طلب الرزق والعلم', content: '"اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً."', source: 'ابن ماجه.', category: 'الدراسة والتحصيل' },
  { id: 43, title: 'دعاء الحفظ والنسيان', content: '"اللهم إني أستودعك ما قرأت وما حفظت وما فهمت، فردَّه لي عند حاجتي إليه..."', source: 'دعاء مشروع.', category: 'الدراسة والتحصيل' },

  { id: 73, title: 'استصلاح القلوب وتأليفها', content: '"اللهم ألف بين قلوبنا، وأصلح ذات بيننا، واهدنا سبل السلام، ونجنا من الظلمات إلى النور."', source: 'أبو داود (969)، والحاكم.', category: 'التعامل والأخلاق' },
  { id: 74, title: 'الحفظ من شرور الناس', content: '"اللهم إني أعوذ بك من شر سمعي، ومن شر بصري، ومن شر لساني، ومن شر قلبي، ومن شر مني."', source: 'الترمذي (3492)، وصححه الألباني.', category: 'التعامل والأخلاق' },
  { id: 75, title: 'طلب حسن الخلق', content: '"اللهم كما حسَّنت خَلْقي فحسِّن خُلُقي."', source: 'أحمد (24392)، وابن حبان، وصححه الألباني.', category: 'التعامل والأخلاق' },
  { id: 76, title: 'دفع سوء المعاملة', content: '"اللهم إنا نجعلك في نحورهم، وأعوذ بك من شرورهم."', source: 'أبو داود (1537)، وصححه الألباني.', category: 'التعامل والأخلاق' },
  { id: 77, title: 'التواضع والبعد عن الكبر', content: '"اللهم إني أعوذ بك أن أُشرك بك وأنا أعلم، وأستغفرك لما لا أعلم."', source: 'أحمد (19606)، وصححه الألباني.', category: 'التعامل والأخلاق' },
  { id: 78, title: 'رد الغيبة والوقيعة', content: '"اللهم اغفر لي ولمن اغتابني."', source: 'من هدي السلف الصالح والعفو والصفح.', category: 'التعامل والأخلاق' },
  { id: 79, title: 'اللين في الكلام والخطاب', content: '"رَبِّ اشْرَحْ لِي صَدْرِي، وَيَسِّرْ لِي أَمْرِي، وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي, يَفْقَهُوا قَوْلِي."', source: 'سورة طه: 25-28.', category: 'التعامل والأخلاق' }
];

export default function Page() {
  const [lang, setLang] = useState<'ar' | 'fr' | 'en'>('ar');
  const t = translations[lang];

  const [category, setCategory] = useState('أذكار الصباح');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const [darkMode, setDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [audioAtmosphere, setAudioAtmosphere] = useState<'none' | 'rain' | 'nature'>('none');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [aiPrompt, setAiPrompt] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const [tasbeehCount, setTasbeehCount] = useState(0);
  const [globalTasbeeh, setGlobalTasbeeh] = useState(1425890);
  const [streakDays, setStreakDays] = useState(1);
  const [dates, setDates] = useState({ gregorian: '', hijri: '' });
  const [currentTime, setCurrentTime] = useState('');
  const [prayerTimes, setPrayerTimes] = useState({ Fajr: '04:30', Dhuhr: '12:30', Asr: '16:00', Maghrib: '19:15', Isha: '20:45' });

  // نافذة البطاقة ومنصة الشريط الجانبي القابل للفتح والإغلاق
  const [activeCardModal, setActiveCardModal] = useState<{ title: string; content: string; source: string } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const categories = [
    'المفضلة',
    'أذكار الصباح', 
    'أذكار المساء', 
    'النوم والاستيقاظ', 
    'الخروج والسفر', 
    'الرزق وقضاء الدين', 
    'الكرب والهم', 
    'الصحة والعافية', 
    'الدراسة والتحصيل', 
    'التعامل والأخلاق'
  ];

  const playClick = () => {
    try {
      const audio = new Audio('data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAA');
      audio.play().catch(() => {});
    } catch (e) {}
  };

  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(40);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    const savedFavs = localStorage.getItem('mishkat_favorites');
    if (savedFavs) { try { setFavorites(JSON.parse(savedFavs)); } catch (e) {} }

    const savedComp = localStorage.getItem('mishkat_completed');
    if (savedComp) { try { setCompleted(JSON.parse(savedComp)); } catch (e) {} }

    const savedTasbeeh = localStorage.getItem('mishkat_tasbeeh');
    if (savedTasbeeh) { setTasbeehCount(parseInt(savedTasbeeh, 10) || 0); }

    const savedStreak = localStorage.getItem('mishkat_streak');
    if (savedStreak) { setStreakDays(parseInt(savedStreak, 10) || 1); }

    const savedTheme = localStorage.getItem('mishkat_darkmode');
    if (savedTheme !== null) { setDarkMode(savedTheme === 'true'); }

    // تحديث الساعة بأرقام أجنبية (عادية 0-9) باستخدام en-GB
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);

    const now = new Date();
    const optionsGreg: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const gregorianStr = now.toLocaleDateString('ar-SA', optionsGreg);
    
    try {
      const hijriStr = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', { year: 'numeric', month: 'long', day: 'numeric' }).format(now);
      setDates({ gregorian: gregorianStr, hijri: hijriStr });
    } catch (e) {
      setDates({ gregorian: gregorianStr, hijri: '1448 هـ' });
    }

    fetchCityPrayerTimes('Biskra');

    return () => clearInterval(timer);
  }, []);

  const fetchCityPrayerTimes = (city: string) => {
    fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Algeria&method=3`)
      .then(res => res.json())
      .then(data => {
        if (data?.data?.timings) {
          setPrayerTimes({
            Fajr: data.data.timings.Fajr,
            Dhuhr: data.data.timings.Dhuhr,
            Asr: data.data.timings.Asr,
            Maghrib: data.data.timings.Maghrib,
            Isha: data.data.timings.Isha
          });
        }
      })
      .catch(() => {});
  };

  const toggleDarkMode = () => {
    playClick();
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    localStorage.setItem('mishkat_darkmode', nextMode.toString());
    showToast(nextMode ? 'تم تفعيل الوضع الداكن 🌙' : 'تم الانتقال للوضع الفاتح ☀️');
  };

  const changeAtmosphere = (type: 'none' | 'rain' | 'nature') => {
    playClick();
    if (audioRef.current) { audioRef.current.pause(); }
    setAudioAtmosphere(type);
    if (type === 'none') {
      showToast('تم إيقاف الأجواء الصوتية');
      return;
    }
    const url = type === 'rain' 
      ? 'https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg'
      : 'https://actions.google.com/sounds/v1/environments/forest_birds.ogg';
    
    audioRef.current = new Audio(url);
    audioRef.current.loop = true;
    audioRef.current.play().catch(() => {});
    showToast(type === 'rain' ? 'تشغيل أجواء المطر الخاشعة 🌧️' : 'تشغيل أصوات الطبيعة الهادئة 🌲');
  };

  const requestNotifications = () => {
    playClick();
    if (!('Notification' in window)) {
      showToast('متصفحك لا يدعم الإشعارات');
      return;
    }
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        showToast('تم تفعيل إشعارات التذكير بنجاح 🔔');
        new Notification('مشكاة الهداية', { body: 'تم تفعيل التذكير بالأذكار بنجاح!' });
      } else {
        showToast('تم رفض إذن الإشعارات');
      }
    });
  };

  const toggleFavorite = (id: number) => {
    playClick();
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
      showToast('أُزيلت من المفضلة');
    } else {
      updated = [...favorites, id];
      showToast('أُضيفت إلى المفضلة ❤️');
    }
    setFavorites(updated);
    localStorage.setItem('mishkat_favorites', JSON.stringify(updated));
  };

  const toggleComplete = (id: number) => {
    playClick();
    let updated;
    if (completed.includes(id)) {
      updated = completed.filter(compId => compId !== id);
      showToast('تم إلغاء تحديد القراءة');
    } else {
      updated = [...completed, id];
      showToast('تقبل الله ذكرك ✔️');
      const newStreak = streakDays + 1;
      setStreakDays(newStreak);
      localStorage.setItem('mishkat_streak', newStreak.toString());
    }
    setCompleted(updated);
    localStorage.setItem('mishkat_completed', JSON.stringify(updated));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const copyToClipboard = (text: string) => {
    playClick();
    navigator.clipboard.writeText(text);
    showToast('تم نسخ النص بنجاح');
  };

  const handleCategoryChange = (cat: string) => {
    playClick();
    setCategory(cat);
  };

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    if (!aiPrompt.trim()) return;

    setIsAiLoading(true);
    setAiAnswer('');

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
      if (!apiKey) {
        setAiAnswer("يرجى ضبط مفتاح NEXT_PUBLIC_GEMINI_API_KEY في إعدادات البيئة.");
        setIsAiLoading(false);
        return;
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `أنت مساعد ذكي داخل منصة "مشكاة الهداية". أجب عن السؤال التالي بدقة واحترافية وبأسلوب حسن: ${aiPrompt}` }] }]
        })
      });

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "عذراً، لم يتم تلقي استجابة صحيحة.";
      setAiAnswer(reply);
    } catch (error) {
      setAiAnswer("تعذر الاتصال بالخادم، تحقق من الاتصال بالإنترنت.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleTasbeehClick = () => {
    playClick();
    triggerHaptic();
    const newCount = tasbeehCount + 1;
    setTasbeehCount(newCount);
    setGlobalTasbeeh(globalTasbeeh + 1);
    localStorage.setItem('mishkat_tasbeeh', newCount.toString());
  };

  const resetTasbeeh = () => {
    playClick();
    setTasbeehCount(0);
    localStorage.setItem('mishkat_tasbeeh', '0');
    showToast('تم تصفير العدّاد');
  };

  const filteredAdhkar = adhkarDatabase.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.source.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (category === 'المفضلة') {
      return favorites.includes(item.id) && matchesSearch;
    }
    return item.category === category && matchesSearch;
  });

  const contentSizeClass = fontSize === 'xlarge' ? 'text-2xl sm:text-3xl' : fontSize === 'large' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl';

  return (
    <div className={`p-4 sm:p-8 min-h-screen relative font-sans transition-colors duration-300 selection:bg-emerald-500 selection:text-white ${darkMode ? 'bg-[#030712] text-slate-100' : 'bg-slate-50 text-slate-900'}`} dir={lang === 'en' || lang === 'fr' ? 'ltr' : 'rtl'}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Tajawal:wght@400;700;900&display=swap');
        .quran-font { font-family: 'Amiri Quran', serif; }
        .ui-font { font-family: 'Tajawal', sans-serif; }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px rgba(16, 185, 129, 0.5), 0 0 20px rgba(16, 185, 129, 0.3); }
          50% { text-shadow: 0 0 20px rgba(16, 185, 129, 0.8), 0 0 30px rgba(16, 185, 129, 0.5); }
        }
        .glow-clock { animation: glow 2s infinite ease-in-out; }
      `}</style>

      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl font-bold transition-all animate-bounce ui-font text-sm">
          {toastMessage}
        </div>
      )}

      {/* نافذة البطاقة المنبثقة */}
      {activeCardModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border-2 border-amber-500/50 p-8 rounded-3xl max-w-lg w-full shadow-2xl text-center relative ui-font">
            <button onClick={() => setActiveCardModal(null)} className="absolute top-4 left-4 text-slate-400 hover:text-white text-lg font-bold">✕</button>
            <span className="text-xs text-amber-400 uppercase tracking-widest block mb-2 font-mono">🌟 {t.title}</span>
            <h3 className="text-2xl font-bold text-amber-500 quran-font mb-4">{activeCardModal.title}</h3>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">
              <p className="text-xl quran-font text-slate-100 leading-relaxed">{activeCardModal.content}</p>
              <span className="text-xs text-emerald-400 block mt-4 font-mono">📖 {activeCardModal.source}</span>
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={() => { copyToClipboard(activeCardModal.content); setActiveCardModal(null); }} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow-md">
                {t.copy} 📋
              </button>
              <button onClick={() => setActiveCardModal(null)} className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-6 py-2.5 rounded-xl text-sm transition-all">
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* الشريط الجانبي القابل للفتح والإغلاق (للهواتف والأجهزة الصغيرة لتجنب الحشو) */}
      <div className={`fixed inset-y-0 right-0 z-50 w-80 max-w-full transform transition-transform duration-300 shadow-2xl flex flex-col p-6 overflow-y-auto ui-font ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} ${darkMode ? 'bg-slate-900 border-l border-slate-800 text-slate-100' : 'bg-white border-l border-slate-200 text-slate-900'}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-emerald-500">⚙️ {t.settings}</h3>
          <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-white font-bold text-lg">✕</button>
        </div>

        <div className="space-y-6">
          {/* التحكم في اللغة */}
          <div className="p-3 rounded-xl bg-slate-800/20 border border-slate-700/30">
            <span className="text-xs font-bold block mb-2">🌐 اختر اللغة / Langue / Language</span>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => setLang('ar')} className={`py-1.5 rounded-lg text-xs font-bold ${lang === 'ar' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}>عربي</button>
              <button onClick={() => setLang('fr')} className={`py-1.5 rounded-lg text-xs font-bold ${lang === 'fr' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}>Français</button>
              <button onClick={() => setLang('en')} className={`py-1.5 rounded-lg text-xs font-bold ${lang === 'en' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}>English</button>
            </div>
          </div>

          {/* الوضع الليلي وحجم الخط */}
          <div className="p-3 rounded-xl bg-slate-800/20 border border-slate-700/35 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold">الوضع الليلي (الداكن)</span>
              <button onClick={toggleDarkMode} className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white">
                {darkMode ? 'مفعل 🌙' : 'معطل ☀️'}
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold">حجم خط النصوص</span>
              <select 
                value={fontSize} 
                onChange={(e) => setFontSize(e.target.value as any)}
                className={`px-2 py-1 rounded-lg text-xs font-bold border focus:outline-none ${darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-black'}`}
              >
                <option value="normal">عادي</option>
                <option value="large">كبير</option>
                <option value="xlarge">كبير جداً</option>
              </select>
            </div>
          </div>

          {/* السبحة الرقمية المصغرة داخل الشريط الجانبي */}
          <div className={`p-4 rounded-2xl border text-center ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="text-sm font-bold text-emerald-500 mb-1">{t.tasbeehTitle}</h4>
            <span className="text-3xl font-black text-amber-500 block font-mono my-2">{tasbeehCount}</span>
            <div className="flex gap-2">
              <button onClick={handleTasbeehClick} className="flex-1 bg-emerald-600 text-white py-2 rounded-xl text-xs font-bold shadow-md active:scale-95">{t.tasbeehBtn}</button>
              <button onClick={resetTasbeeh} className="px-3 bg-slate-800 text-slate-300 rounded-xl text-xs">{t.reset}</button>
            </div>
            <div className="text-[10px] text-emerald-400 font-mono mt-2">
              {t.globalCounter} {isMounted ? globalTasbeeh.toLocaleString() : '...'}
            </div>
          </div>

          {/* الأجواء الخاشعة */}
          <div className="p-3 rounded-xl bg-slate-800/20 border border-slate-700/30 text-center">
            <span className="text-xs font-bold block mb-2">{t.atmosphere}</span>
            <div className="grid grid-cols-3 gap-1">
              <button onClick={() => changeAtmosphere('none')} className={`py-1.5 rounded-lg text-[11px] font-bold ${audioAtmosphere === 'none' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}>{t.silent}</button>
              <button onClick={() => changeAtmosphere('rain')} className={`py-1.5 rounded-lg text-[11px] font-bold ${audioAtmosphere === 'rain' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}>{t.rain}</button>
              <button onClick={() => changeAtmosphere('nature')} className={`py-1.5 rounded-lg text-[11px] font-bold ${audioAtmosphere === 'nature' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}>{t.nature}</button>
            </div>
          </div>

          {/* إشعارات التذكير */}
          <div className="flex justify-between items-center p-3 rounded-xl bg-slate-800/20 border border-slate-700/30">
            <span className="text-xs font-bold">إشعارات التذكير</span>
            <button onClick={requestNotifications} className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white">
              {notificationsEnabled ? 'مفعلة 🔔' : 'تفعيل'}
            </button>
          </div>
        </div>
      </div>

      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"></div>}

      {/* الشريط العلوي */}
      <div className={`max-w-6xl mx-auto mb-3 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm p-3 rounded-xl border ui-font gap-2 ${darkMode ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600 shadow-sm'}`}>
        <div className="flex gap-3 flex-wrap justify-center items-center">
          <span>📅 <span className="font-semibold">{dates.gregorian}</span></span>
          <span>🌙 <span className="font-semibold text-amber-500">{dates.hijri}</span></span>
          <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">🔥 {t.streak}: {streakDays}</span>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <button onClick={() => setIsSidebarOpen(true)} className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center gap-1.5 transition-all">
            ⚙️ {t.settings}
          </button>
          <button onClick={toggleDarkMode} className="p-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700">
            {darkMode ? '☀️ فاتح' : '🌙 داكن'}
          </button>
        </div>
      </div>

      {/* ساعة رقمية لماعة بأرقام أجنبية + مواقيت أذان بسكرة */}
      <div className={`max-w-6xl mx-auto mb-6 border p-4 rounded-3xl flex flex-col md:flex-row justify-around items-center text-center ui-font gap-4 ${darkMode ? 'bg-slate-900/90 border-slate-800 shadow-2xl' : 'bg-white border-slate-200 shadow-md'}`}>
        <div className="flex flex-col items-center">
          <span className="text-[11px] text-emerald-500 uppercase tracking-widest font-mono mb-1">⏰ {t.localTime}</span>
          {/* الساعة بأرقام أجنبية باستخدام font-mono وتنسيق en-GB */}
          <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-widest glow-clock" dir="ltr">
            {currentTime || '00:00:00'}
          </span>
        </div>
        
        <div className="h-8 w-[1px] bg-slate-700/50 hidden md:block"></div>

        <div className="flex flex-col items-center">
          <span className="text-xs text-emerald-500 font-bold mb-2">🕌 {t.prayerTimes}</span>
          <div className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm" dir="ltr">
            <div className="px-2.5 py-1 rounded-xl bg-slate-800/40 border border-slate-700/30"><span className="text-slate-400 block text-[10px]">{t.fajr}</span><span className="font-bold font-mono">{prayerTimes.Fajr}</span></div>
            <div className="px-2.5 py-1 rounded-xl bg-slate-800/40 border border-slate-700/30"><span className="text-slate-400 block text-[10px]">{t.dhuhr}</span><span className="font-bold font-mono">{prayerTimes.Dhuhr}</span></div>
            <div className="px-2.5 py-1 rounded-xl bg-slate-800/40 border border-slate-700/30"><span className="text-slate-400 block text-[10px]">{t.asr}</span><span className="font-bold font-mono">{prayerTimes.Asr}</span></div>
            <div className="px-2.5 py-1 rounded-xl bg-slate-800/40 border border-slate-700/30"><span className="text-slate-400 block text-[10px]">{t.maghrib}</span><span className="font-bold font-mono">{prayerTimes.Maghrib}</span></div>
            <div className="px-2.5 py-1 rounded-xl bg-slate-800/40 border border-slate-700/30"><span className="text-slate-400 block text-[10px]">{t.isha}</span><span className="font-bold font-mono">{prayerTimes.Isha}</span></div>
          </div>
        </div>
      </div>

      {/* العنوان الرئيسي واسم المنصة الجديد بدون بطاقة منشئ */}
      <div className="text-center mb-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-emerald-500 quran-font tracking-wide drop-shadow-md">
          {t.title}
        </h1>
        <p className={`text-xs sm:text-sm mt-3 ui-font tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          تصميم وبرمجة: <span className="text-amber-500 font-extrabold text-base underline decoration-emerald-500 underline-offset-4">عبد الرحمان بن قرعة</span> • ولاية بسكرة، الجزائر
        </p>
      </div>

      {/* بحث */}
      <div className="max-w-6xl mx-auto mb-6">
        <input 
          type="text" 
          placeholder={t.searchPlaceholder} 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full px-5 py-3 rounded-2xl border focus:outline-none focus:border-emerald-500 shadow-inner transition-all ui-font text-sm ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-500' : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 shadow-sm'}`}
        />
      </div>

      {/* الأقسام */}
      <div className="flex overflow-x-auto gap-3 pb-4 mb-8 scrollbar-none max-w-6xl mx-auto px-2 justify-start sm:justify-center ui-font">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => handleCategoryChange(cat)} 
            className={`px-5 py-2.5 rounded-full font-bold whitespace-nowrap transition-all text-sm sm:text-base flex-shrink-0 ${category === cat ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50 scale-105' : darkMode ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm'}`}
          >
            {cat === 'المفضلة' ? t.favorites : cat}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* قائمة الأذكار */}
        <div className="lg:col-span-2 space-y-6">
          {filteredAdhkar.length === 0 ? (
            <div className={`text-center py-16 rounded-2xl border ui-font ${darkMode ? 'bg-slate-900/50 border-slate-800 text-slate-500' : 'bg-white border-slate-200 text-slate-400 shadow-sm'}`}>
              <p className="text-base">لا توجد أدعية مطابقة لبحثك أو في هذا القسم.</p>
            </div>
          ) : (
            filteredAdhkar.map(item => {
              const isFav = favorites.includes(item.id);
              const isComp = completed.includes(item.id);
              return (
                <div 
                  key={item.id} 
                  className={`p-6 rounded-2xl border transition-all relative group ui-font ${isComp ? (darkMode ? 'bg-slate-900/30 border-slate-800/80 opacity-60' : 'bg-slate-100 border-slate-200 opacity-65') : (darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-xl' : 'bg-white border-slate-200 shadow-md hover:shadow-lg')}`}
                >
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <span className="text-xs bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1 rounded-full font-bold">
                      {item.category}
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => setActiveCardModal({ title: item.title, content: item.content, source: item.source })} className={`p-2 rounded-xl transition-all ${darkMode ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-slate-100 text-amber-600'}`} title={t.card}>
                        🎴 {t.card}
                      </button>
                      <button onClick={() => toggleFavorite(item.id)} className={`p-2 rounded-xl transition-all ${isFav ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30' : darkMode ? 'bg-slate-800 text-slate-400 hover:text-slate-200' : 'bg-slate-100 text-slate-500'}`} title={t.favorites}>
                        {isFav ? '❤️' : '🤍'}
                      </button>
                      <button onClick={() => copyToClipboard(item.content)} className={`p-2 rounded-xl transition-all ${darkMode ? 'bg-slate-800 text-slate-400 hover:text-slate-200' : 'bg-slate-100 text-slate-500'}`} title={t.copy}>
                        📋
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-amber-500 quran-font mb-3">{item.title}</h3>
                  <p className={`quran-font leading-loose mb-6 ${contentSizeClass} ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>{item.content}</p>

                  <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t ${darkMode ? 'border-slate-800/80' : 'border-slate-100'}`}>
                    <span className="text-xs text-slate-400 font-mono">📖 {item.source}</span>
                    <button onClick={() => toggleComplete(item.id)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${isComp ? 'bg-slate-700 text-slate-300' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'}`}>
                      {isComp ? t.completed : t.markComplete}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* الشريط الجانبي الثابت في الشاشات الكبيرة */}
        <div className="space-y-6 hidden lg:block">
          
          {/* السبحة والعداد العالمي */}
          <div className={`border p-6 rounded-3xl ui-font text-center shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h2 className="text-xl font-bold text-emerald-500 mb-1">{t.tasbeehTitle}</h2>
            <p className="text-slate-400 text-xs mb-4">{t.tasbeehSub}</p>

            <div className="my-4">
              <span className="text-6xl font-black text-amber-500 block tracking-wider font-mono drop-shadow-lg">
                {tasbeehCount}
              </span>
              <span className="text-[11px] text-slate-400 uppercase tracking-widest mt-1 block">تسبيحاتك اليومية</span>
            </div>

            <div className="flex gap-2 justify-center mb-4">
              <button onClick={handleTasbeehClick} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-2xl text-sm shadow-lg active:scale-95 transition-all">
                {t.tasbeehBtn}
              </button>
              <button onClick={resetTasbeeh} className={`px-4 rounded-2xl font-bold text-xs transition-all ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}>
                {t.reset}
              </button>
            </div>

            <div className={`p-3 rounded-xl text-xs font-mono border ${darkMode ? 'bg-slate-950 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-500/20 text-emerald-700'}`}>
              {t.globalCounter} <span className="font-bold">{isMounted ? globalTasbeeh.toLocaleString() : '...'}</span>
            </div>
          </div>

          {/* الأوسمة والإنجازات */}
          <div className={`border p-6 rounded-3xl ui-font shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h2 className="text-xl font-bold text-emerald-500 mb-1">{t.achievements}</h2>
            <p className="text-slate-400 text-xs mb-4">إنجازاتك الروحية المتتالية:</p>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className={`p-3 rounded-2xl border ${tasbeehCount >= 100 ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-400' : 'bg-slate-800/40 border-slate-800 text-slate-500'}`}>
                <span className="text-2xl block mb-1">🌟</span>
                <span className="text-xs font-bold block">مائة تسبيحة</span>
              </div>
              <div className={`p-3 rounded-2xl border ${streakDays >= 3 ? 'bg-amber-600/20 border-amber-500/40 text-amber-400' : 'bg-slate-800/40 border-slate-800 text-slate-500'}`}>
                <span className="text-2xl block mb-1">🔥</span>
                <span className="text-xs font-bold block">مواظب 3 أيام</span>
              </div>
            </div>
          </div>

          {/* الأجواء الخاشعة */}
          <div className={`border p-6 rounded-3xl ui-font text-center shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h2 className="text-xl font-bold text-emerald-500 mb-1">{t.atmosphere}</h2>
            <p className="text-slate-400 text-xs mb-4">اختر أجواء تزيدك تركيزاً أثناء الذكر</p>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => changeAtmosphere('none')} className={`py-2 rounded-xl text-xs font-bold transition-all ${audioAtmosphere === 'none' ? 'bg-emerald-600 text-white' : darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                {t.silent}
              </button>
              <button onClick={() => changeAtmosphere('rain')} className={`py-2 rounded-xl text-xs font-bold transition-all ${audioAtmosphere === 'rain' ? 'bg-emerald-600 text-white' : darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                {t.rain}
              </button>
              <button onClick={() => changeAtmosphere('nature')} className={`py-2 rounded-xl text-xs font-bold transition-all ${audioAtmosphere === 'nature' ? 'bg-emerald-600 text-white' : darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                {t.nature}
              </button>
            </div>
          </div>

          {/* المساعد الذكي */}
          <div className={`border p-6 rounded-3xl ui-font shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h2 className="text-xl font-bold text-emerald-500 mb-1">{t.aiAssistant}</h2>
            <p className="text-slate-400 text-xs mb-4">استفسر عن أي مسألة فقهية أو علمية:</p>
            
            <form onSubmit={handleAskAI} className="space-y-3 mb-4">
              <input 
                type="text"
                placeholder={t.aiPlaceholder}
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className={`w-full border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-emerald-500 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
              />
              <button type="submit" disabled={isAiLoading} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-md">
                {isAiLoading ? 'جارِ المعالجة...' : t.aiBtn}
              </button>
            </form>

            {aiAnswer && (
              <div className={`border p-4 rounded-xl text-right relative ${darkMode ? 'bg-slate-950 border-emerald-500/30' : 'bg-slate-50 border-emerald-500/30'}`}>
                <button onClick={() => copyToClipboard(aiAnswer)} className="absolute top-2 left-2 text-xs text-slate-400 hover:text-white">📋</button>
                <h4 className="text-xs font-bold text-amber-500 mb-1">الإجابة:</h4>
                <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{aiAnswer}</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}