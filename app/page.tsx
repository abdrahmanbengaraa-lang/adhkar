'use client';

import { useState, useEffect } from 'react';

const adhkarDatabase = [
  // --- القسم الأول: أذكار الصباح ---
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

  // --- القسم الثاني: أذكار المساء ---
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

  // --- القسم الثالث: النوم والاستيقاظ ---
  { id: 44, title: 'نفث المعوذات', content: 'النفث في الكفين وقراءة المعوذات الثلاث ثم المسح على الجسد.', source: 'البخاري (5017).', category: 'النوم والاستيقاظ' },
  { id: 45, title: 'آية الكرسي قبل النوم', content: '{اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...}', source: 'البخاري (2311).', category: 'النوم والاستيقاظ' },
  { id: 46, title: 'دعاء النوم الأساسي', content: '"باسمك ربي وضعت جنبي، وبك أرفعه، إن أمسكت نفسي فارحمها..."', source: 'البخاري (6320).', category: 'النوم والاستيقاظ' },
  { id: 47, title: 'التفويض قبل النوم', content: '"اللهم أسلمت نفسي إليك، ووجهت وجهي إليك، وفوضت أمري إليك..."', source: 'البخاري (247).', category: 'النوم والاستيقاظ' },
  { id: 48, title: 'الوقاية من الفزع', content: '"أعوذ بكلمات الله التامات من غضبه وعقابه، وشر عباده، ومن همزات الشياطين..."', source: 'أبو داود (3893).', category: 'النوم والاستيقاظ' },
  { id: 49, title: 'دعاء الاستيقاظ من النوم', content: '"الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور."', source: 'البخاري (6312).', category: 'النوم والاستيقاظ' },
  { id: 50, title: 'الاستيقاظ والذكر ليلاً', content: '"لا إله إلا الله وحده لا شريك له، له الملك وله الحمد..."', source: 'البخاري (1154).', category: 'النوم والاستيقاظ' },

  // --- القسم الرابع: الخروج والسفر ---
  { id: 51, title: 'دعاء الخروج', content: '"بسم الله، توكلت على الله، ولا حول ولا قوة إلا بالله."', source: 'أبو داود (5095).', category: 'الخروج والسفر' },
  { id: 52, title: 'دعاء دخول المنزل', content: '"بسم الله ولجنا، وبسم الله خرجنا، وعلى ربنا توكلنا."', source: 'أبو داود (5096).', category: 'الخروج والسفر' },
  { id: 53, title: 'دعاء الركوب', content: '"بسم الله، والحمد لله، {سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ}..."', source: 'أبو داود (2602).', category: 'الخروج والسفر' },
  { id: 54, title: 'دعاء العودة من السفر', content: '"آيبون، تائبون، عابدون، لربنا حامدون."', source: 'مسلم (1345).', category: 'الخروج والسفر' },
  { id: 55, title: 'دعاء دخول السوق', content: '"لا إله إلا الله وحده لا شريك له، له الملك وله الحمد، يحيي ويميت..."', source: 'الترمذي (3428).', category: 'الخروج والسفر' },
  { id: 56, title: 'دعاء دخول القرية', content: '"اللهم رب السماوات السبع وما أظللن، ورب الأرضين السبع وما أقللن..."', source: 'النسائي (542).', category: 'الخروج والسفر' },
  { id: 57, title: 'دعاء النزول في مكان', content: '"أعوذ بكلمات الله التامات من شر ما خلق."', source: 'مسلم (2708).', category: 'الخروج والسفر' },

  // --- القسم الخامس: الرزق وقضاء الدين ---
  { id: 32, title: 'دعاء قضاء الديون', content: '"اللهم إني أعوذ بك من الهم والحزن، والعجز والكسل، والبخل والجبن، وغلبة الدين وقهر الرجال."', source: 'البخاري (6369).', category: 'الرزق وقضاء الدين' },
  { id: 33, title: 'طلب الكفاية من الحلال', content: '"اللهم اكفني بحلالك عن حرامك، وأغنني بفضلك عمن سواك."', source: 'الترمذي (3563).', category: 'الرزق وقضاء الدين' },
  { id: 34, title: 'البركة في الثمر والمدينة', content: '"اللهم بارك لنا في ثمرنا، وبارك لنا في مدينتنا، وبارك لنا في صاعنا، وبارك لنا في مدنا."', source: 'مسلم (1373).', category: 'الرزق وقضاء الدين' },
  { id: 35, title: 'الاستغفار للرزق', content: '"استغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه."', source: 'أبو داود والترمذي.', category: 'الرزق وقضاء الدين' },
  { id: 36, title: 'جلب الخير الشامل', content: '"اللهم إني أسألك من الخير كله عاجله وآجله، ما علمت منه وما لم أعلم..."', source: 'ابن ماجه (3846).', category: 'الرزق وقضاء الدين' },
  { id: 37, title: 'البركة في الأهل والمال', content: '"اللهم بارك لي في أهلي ومالي، وبارك لي فيما رزقتني وقنعي به."', source: 'ثبتت صيغ عديدة.', category: 'الرزق وقضاء الدين' },
  { id: 38, title: 'طلب العلم والرزق', content: '"اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً."', source: 'ابن ماجه (925).', category: 'الرزق وقضاء الدين' },

  // --- القسم السادس: الكرب والهم ---
  { id: 58, title: 'دعاء الكرب (ذي النون)', content: '"لا إله إلا أنت سبحانك إني كنت من الظالمين."', source: 'الترمذي (3505).', category: 'الكرب والهم' },
  { id: 59, title: 'عظمة الله وتفريج الكرب', content: '"لا إله إلا الله العظيم الحليم، لا إله إلا الله رب العرش العظيم..."', source: 'البخاري (6346).', category: 'الكرب والهم' },
  { id: 60, title: 'الهم والحزن', content: '"اللهم إني عبدك ابن عبدك، ابن أمتك، ناصيتي بيدك، ماض في حكمك..."', source: 'أحمد (3712).', category: 'الكرب والهم' },
  { id: 61, title: 'صلاح الحال', content: '"يا حي يا قيوم برحمتك أستغيث، أصلح لي شأني كله، ولا تكلني إلى نفسي طرفة عين."', source: 'النسائي (10372).', category: 'الكرب والهم' },
  { id: 62, title: 'التوكل عند الصعاب', content: '"اللهم لا سهل إلا ما جعلته سهلاً، وأنت تجعل الحزن إذا شئت سهلاً."', source: 'ابن حبان.', category: 'الكرب والهم' },
  { id: 63, title: 'الاستخارة', content: '"اللهم إني أستخيرك بعلمك، وأستقدرك بقدرتك، وأسألك من فضلك العظيم..."', source: 'البخاري (1166).', category: 'الكرب والهم' },
  { id: 64, title: 'دفع سوء القضاء', content: '"اللهم إني أعوذ بك من زوال نعمتك، وتحول عافيتك، وفجاءة نقمتك..."', source: 'مسلم (2739).', category: 'الكرب والهم' },

  // --- القسم السابع: الصحة والعافية ---
  { id: 65, title: 'العافية في الجوارح', content: '"اللهم عافني في بدني، اللهم عافني في سمعي، اللهم عافني في بصري، لا إله إلا أنت."', source: 'أبو داود (5090)، وأحمد، وصححه الألباني.', category: 'الصحة والعافية' },
  { id: 66, title: 'الحفظ الشامل من الأضرار', content: '"بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم."', source: 'أبو داود (5088)، والترمذي (3388)، وصححه الألباني.', category: 'الصحة والعافية' },
  { id: 67, title: 'الشفاء للمريض', content: '"اللهم رب الناس أذهب البأس، اشفِ أنت الشافي، لا شفاء إلا شفاؤك، شفاءً لا يغادر سقماً."', source: 'البخاري (5743)، ومسلم (2191).', category: 'الصحة والعافية' },
  { id: 68, title: 'الرقية من الأوجاع', content: 'يضع يده على موضع الألم ويقول: "بسم الله" (3 مرات)، ثم "أعوذ بالله وقدرته من شر ما أجد وأحاذر" (7 مرات).', source: 'مسلم (2202).', category: 'الصحة والعافية' },
  { id: 69, title: 'الاستعاذة من الأمراض', content: '"اللهم إني أعوذ بك من البرص، والجنون، والجذام، ومن سيئ الأسقام."', source: 'أبو داود (1554)، والنسائي (5493).', category: 'الصحة والعافية' },
  { id: 70, title: 'التحصين من العين والحسد', content: '"أعوذ بكلمات الله التامة، من كل شيطان وهامة، ومن كل عين لامة."', source: 'البخاري (3371).', category: 'الصحة والعافية' },
  { id: 71, title: 'العافية في الدنيا والآخرة', content: '"اللهم إني أسألك العافية في الدنيا والآخرة، اللهم إني أسألك العفو والعافية في ديني ودنياي وأهلي ومالي."', source: 'أبو داود (5074)، وصححه الألباني.', category: 'الصحة والعافية' },
  { id: 72, title: 'الاستشفاء بالقرآن', content: 'قراءة سورة الفاتحة، وسورة الإخلاص، والمعوذتين والنفث على المريض أو على ماء.', source: 'البخاري (5736)، ومسلم (2201).', category: 'الصحة والعافية' },

  // --- القسم الثامن: الدراسة والتحصيل ---
  { id: 39, title: 'تيسير الفهم', content: '"اللهم لا سهل إلا ما جعلته سهلاً، وأنت تجعل الحزن إذا شئت سهلاً."', source: 'ابن حبان (2427).', category: 'الدراسة والتحصيل' },
  { id: 40, title: 'طلب العلم', content: '"رَبِّ زِدْنِي عِلْماً."', source: 'سورة طه: 114.', category: 'الدراسة والتحصيل' },
  { id: 41, title: 'التوكل عند الشدائد', content: '"حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم."', source: 'أبو داود.', category: 'الدراسة والتحصيل' },
  { id: 42, title: 'طلب الرزق والعلم', content: '"اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً."', source: 'ابن ماجه.', category: 'الدراسة والتحصيل' },
  { id: 43, title: 'دعاء الحفظ والنسيان', content: '"اللهم إني أستودعك ما قرأت وما حفظت وما فهمت، فردَّه لي عند حاجتي إليه..."', source: 'دعاء مشروع.', category: 'الدراسة والتحصيل' },

  // --- القسم التاسع: التعامل والأخلاق ---
  { id: 73, title: 'استصلاح القلوب وتأليفها', content: '"اللهم ألف بين قلوبنا، وأصلح ذات بيننا، واهدنا سبل السلام، ونجنا من الظلمات إلى النور."', source: 'أبو داود (969)، والحاكم.', category: 'التعامل والأخلاق' },
  { id: 74, title: 'الحفظ من شرور الناس', content: '"اللهم إني أعوذ بك من شر سمعي، ومن شر بصري، ومن شر لساني، ومن شر قلبي، ومن شر مني."', source: 'الترمذي (3492)، وصححه الألباني.', category: 'التعامل والأخلاق' },
  { id: 75, title: 'طلب حسن الخلق', content: '"اللهم كما حسَّنت خَلْقي فحسِّن خُلُقي."', source: 'أحمد (24392)، وابن حبان، وصححه الألباني.', category: 'التعامل والأخلاق' },
  { id: 76, title: 'دفع سوء المعاملة', content: '"اللهم إنا نجعلك في نحورهم، وأعوذ بك من شرورهم."', source: 'أبو داود (1537)، وصححه الألباني.', category: 'التعامل والأخلاق' },
  { id: 77, title: 'التواضع والبعد عن الكبر', content: '"اللهم إني أعوذ بك أن أُشرك بك وأنا أعلم، وأستغفرك لما لا أعلم."', source: 'أحمد (19606)، وصححه الألباني.', category: 'التعامل والأخلاق' },
  { id: 78, title: 'رد الغيبة والوقيعة', content: '"اللهم اغفر لي ولمن اغتابني."', source: 'من هدي السلف الصالح والعفو والصفح.', category: 'التعامل والأخلاق' },
  { id: 79, title: 'اللين في الكلام والخطاب', content: '"رَبِّ اشْرَحْ لِي صَدْرِي، وَيَسِّرْ لِي أَمْرِي، وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي، يَفْقَهُوا قَوْلِي."', source: 'سورة طه: 25-28.', category: 'التعامل والأخلاق' }
];

export default function Page() {
  const [category, setCategory] = useState('أذكار الصباح');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // التاريخ الهجري والميلادي الفعلي
  const [dates, setDates] = useState({ gregorian: '', hijri: '' });
  // مواقيت الصلاة (بيانات افتراضية تجريبية أو حية)
  const [prayerTimes, setPrayerTimes] = useState({ Fajr: '04:30', Dhuhr: '12:30', Asr: '16:00', Maghrib: '19:15', Isha: '20:45' });

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

  useEffect(() => {
    // تحميل المفضلة والمكتملات من التخزين المحلي
    const savedFavs = localStorage.getItem('rawdat_favorites');
    if (savedFavs) { try { setFavorites(JSON.parse(savedFavs)); } catch (e) {} }

    const savedComp = localStorage.getItem('rawdat_completed');
    if (savedComp) { try { setCompleted(JSON.parse(savedComp)); } catch (e) {} }

    // توليد التواريخ
    const now = new Date();
    const optionsGreg: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const gregorianStr = now.toLocaleDateString('ar-SA', optionsGreg);
    
    try {
      const hijriStr = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', { year: 'numeric', month: 'long', day: 'numeric' }).format(now);
      setDates({ gregorian: gregorianStr, hijri: hijriStr });
    } catch (e) {
      setDates({ gregorian: gregorianStr, hijri: 'التاريخ الهجري' });
    }

    // جلب مواقيت الصلاة تلقائياً عبر API مجاني (Aladhan)
    fetch('https://api.aladhan.com/v1/timingsByCity?city=Algiers&country=Algeria&method=3')
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.timings) {
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
  }, []);

  const requestNotifications = () => {
    if (!('Notification' in window)) {
      showToast('متصفحك لا يدعم الإشعارات');
      return;
    }
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        showToast('تم تفعيل إشعارات التذكير بنجاح 🔔');
        new Notification('روضة الأذكار', { body: 'تم تفعيل التذكير بالأذكار بنجاح!' });
      } else {
        showToast('تم رفض إذن الإشعارات');
      }
    });
  };

  const toggleFavorite = (id: number) => {
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
      showToast('أُزيلت من المفضلة');
    } else {
      updated = [...favorites, id];
      showToast('أُضيفت إلى المفضلة ❤️');
    }
    setFavorites(updated);
    localStorage.setItem('rawdat_favorites', JSON.stringify(updated));
  };

  const toggleComplete = (id: number) => {
    let updated;
    if (completed.includes(id)) {
      updated = completed.filter(compId => compId !== id);
      showToast('تم إلغاء تحديد القراءة');
    } else {
      updated = [...completed, id];
      showToast('تقبل الله ذكرك ✔️');
    }
    setCompleted(updated);
    localStorage.setItem('rawdat_completed', JSON.stringify(updated));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('تم نسخ الدعاء بنجاح');
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

  return (
    <div className="p-4 sm:p-8 bg-slate-950 text-slate-100 min-h-screen relative font-sans" dir="rtl">
      {/* استدعاء الخط العثماني (Amiri Quran) */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Tajawal:wght@400;700;900&display=swap');
        
        .quran-font {
          font-family: 'Amiri Quran', serif;
        }
        .ui-font {
          font-family: 'Tajawal', sans-serif;
        }
      `}</style>

      {/* إشعار تفاعلي (Toast) */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl font-bold transition-all animate-bounce ui-font text-sm">
          {toastMessage}
        </div>
      )}

      {/* شريط العلوي: التاريخ + زر الإشعارات */}
      <div className="max-w-4xl mx-auto mb-3 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 ui-font gap-2">
        <div className="flex gap-4 flex-wrap justify-center">
          <span>📅 الميلادي: <span className="text-emerald-400 font-semibold">{dates.gregorian}</span></span>
          <span>🌙 الهجري: <span className="text-amber-400 font-semibold">{dates.hijri}</span></span>
        </div>
        <button 
          onClick={requestNotifications}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${notificationsEnabled ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/50' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          {notificationsEnabled ? '🔔 الإشعارات مفعلة' : '🔕 تفعيل إشعارات التذكير'}
        </button>
      </div>

      {/* شريط مواقيت الصلاة المصغر */}
      <div className="max-w-4xl mx-auto mb-6 bg-slate-900/80 border border-slate-800 p-3 rounded-2xl flex justify-around items-center text-center ui-font text-xs sm:text-sm">
        <div><span className="block text-slate-500 text-[10px]">الفجر</span><span className="font-bold text-slate-200">{prayerTimes.Fajr}</span></div>
        <div className="h-4 w-[1px] bg-slate-800"></div>
        <div><span className="block text-slate-500 text-[10px]">الظهر</span><span className="font-bold text-slate-200">{prayerTimes.Dhuhr}</span></div>
        <div className="h-4 w-[1px] bg-slate-800"></div>
        <div><span className="block text-slate-500 text-[10px]">العصر</span><span className="font-bold text-slate-200">{prayerTimes.Asr}</span></div>
        <div className="h-4 w-[1px] bg-slate-800"></div>
        <div><span className="block text-slate-500 text-[10px]">المغرب</span><span className="font-bold text-slate-200">{prayerTimes.Maghrib}</span></div>
        <div className="h-4 w-[1px] bg-slate-800"></div>
        <div><span className="block text-slate-500 text-[10px]">العشاء</span><span className="font-bold text-slate-200">{prayerTimes.Isha}</span></div>
      </div>

      {/* عنوان المنصة بالخط العثماني واسم المنشئ */}
      <div className="text-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-emerald-400 quran-font tracking-wide drop-shadow-md">
          روضة الأذكار
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-2 ui-font tracking-wider">
          صُممت ونظمت بواسطة المنشئ: <span className="text-yellow-400 font-bold">عبد الرحمان بن قرعة</span> • إصدار 2027
        </p>
      </div>

      {/* شريط البحث الفوري */}
      <div className="max-w-xl mx-auto mb-6">
        <input 
          type="text" 
          placeholder="ابحث في الأذكار، العناوين، أو المصادر بدقة..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-5 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 shadow-inner transition-all ui-font text-sm"
        />
      </div>
      
      {/* شريط الأقسام الأفقي المتمرير */}
      <div className="flex overflow-x-auto gap-3 pb-4 mb-8 scrollbar-none max-w-5xl mx-auto px-2 justify-start sm:justify-center ui-font">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setCategory(cat)} 
            className={`px-5 py-2.5 rounded-full font-bold whitespace-nowrap transition-all text-sm sm:text-base flex-shrink-0 ${category === cat ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50 scale-105' : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'}`}
          >
            {cat === 'المفضلة' ? '❤️ المفضلة المحفوظة' : cat}
          </button>
        ))}
      </div>

      {/* قائمة الأدعية */}
      <div className="max-w-4xl mx-auto space-y-6">
        {filteredAdhkar.length === 0 ? (
          <div className="text-center py-16 text-slate-500 bg-slate-900/50 rounded-2xl border border-slate-800 ui-font">
            <p className="text-base">لا توجد أدعية مطابقة لبحثك أو في هذا القسم.</p>
          </div>
        ) : (
          filteredAdhkar.map(item => {
            const isFav = favorites.includes(item.id);
            const isComp = completed.includes(item.id);
            return (
              <div 
                key={item.id} 
                className={`p-6 rounded-2xl border transition-all relative group ui-font ${isComp ? 'bg-slate-900/30 border-slate-800/60 opacity-60' : 'bg-slate-900 border-slate-800 shadow-md hover:border-slate-700'}`}
              >
                <div className="flex justify-between items-start mb-4 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    {/* زر إتمام القراءة (علم صح) بدون شطب النص */}
                    <button 
                      onClick={() => toggleComplete(item.id)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold transition-all border ${isComp ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-950 border-slate-700 text-transparent hover:border-emerald-500'}`}
                      title="ضع علامة كمقروء"
                    >
                      ✓
                    </button>
                    <h2 className="text-xl font-bold text-yellow-400 quran-font">{item.title}</h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleFavorite(item.id)} 
                      className={`p-2 rounded-xl transition-all ${isFav ? 'text-rose-500 bg-rose-500/10' : 'text-slate-500 hover:text-slate-300 bg-slate-950'}`}
                      title="إضافة للمفضلة"
                    >
                      {isFav ? '❤️' : '🤍'}
                    </button>
                    <button 
                      onClick={() => copyToClipboard(item.content)}
                      className="p-2 rounded-xl text-slate-400 hover:text-emerald-400 bg-slate-950 transition-all"
                      title="نسخ الدعاء"
                    >
                      📋
                    </button>
                  </div>
                </div>

                {/* نص الدعاء بالخط العثماني الأوضح والأجمل (مع تخفيض اللون عند القراءة دون شطب) */}
                <p className={`text-2xl leading-loose mb-6 font-normal quran-font ${isComp ? 'text-slate-400' : 'text-slate-100'}`}>
                  {item.content}
                </p>

                <p className="text-xs text-slate-500 italic font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-900">
                  المصدر والتخريج: {item.source}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* تذييل الصفحة (Footer) */}
      <footer className="max-w-4xl mx-auto mt-16 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 ui-font">
        <p>جميع الحقوق محفوظة لمنصة روضة الأذكار © 2027 • إشراف وتطوير: <span className="text-emerald-400 font-bold">عبد الرحمان بن قرعة</span></p>
      </footer>
    </div>
  );
}