import { NextResponse } from 'next/server';

// Self-contained FAQ assistant for site visitors. Answers common questions
// about Bekabad SEZ, Oybek FTZ, Yangi O'zbekiston, tax incentives, and how to
// invest — using a curated multilingual knowledge base below. No external AI
// service is required, so it always works and costs nothing to run.
export const runtime = 'nodejs';

const MAX_CHARS = 2000;

type Lang = 'uz' | 'ru' | 'en' | 'zh';
type Answer = Record<Lang, string>;
type Topic = { keys: string[]; answer: Answer };

// Detect the reply language. The frontend sends the active site language as a
// hint (authoritative); otherwise we fall back to a light script heuristic.
function detectLang(text: string, hint?: unknown): Lang {
  if (hint === 'uz' || hint === 'ru' || hint === 'en' || hint === 'zh') return hint;
  if (/[一-鿿]/.test(text)) return 'zh';
  if (/[Ѐ-ӿ]/.test(text)) return 'ru';
  return 'en';
}

function norm(s: string): string {
  return s.toLowerCase().replace(/['’`]/g, "'").trim();
}

// Ordered most-specific-first: the first topic whose keyword appears in the
// visitor's message wins, so e.g. "soliq" matches incentives before the
// broader "miz/sez" overview.
const TOPICS: Topic[] = [
  {
    keys: [
      'imtiyoz', 'soliq', 'foyda solig', 'yer solig', 'mol-mulk', 'mol mulk',
      'bojxona', 'boj', 'налог', 'льгот', 'преференц', 'пошлин', 'таможн',
      'tax', 'incentive', 'exempt', 'duty', 'customs', 'profit tax', 'benefit',
      '优惠', '税', '免税', '关税',
    ],
    answer: {
      uz: `Bekobod MIZ rezidentlari uchun soliq imtiyozlari (O'zbekiston Soliq kodeksi, 68-bob, 473-modda):

• Foyda solig'i — to'liq ozod: $3–5 mln → 3 yil; $5–15 mln → 5 yil; $15 mln dan yuqori → 10 yil.
• Yer solig'i — to'liq ozod: $0,3–3 mln → 3 yil; $3–5 mln → 5 yil; $5–10 mln → 7 yil; $10 mln dan yuqori → 10 yil.
• Mol-mulk solig'i — yer solig'i bilan bir xil muddatlarda ozod.
• Suv resurslari solig'i — to'liq ozod.
• Bojxona: texnologik uskuna va qurilish materiallarini bojsiz import qilish, soddalashtirilgan rasmiylashtiruv.

Batafsil "Imtiyozlar" sahifasida.`,
      ru: `Налоговые льготы для резидентов СЭЗ Бекабад (Налоговый кодекс РУз, глава 68, статья 473):

• Налог на прибыль — полное освобождение: $3–5 млн → 3 года; $5–15 млн → 5 лет; свыше $15 млн → 10 лет.
• Земельный налог — полное освобождение: $0,3–3 млн → 3 года; $3–5 млн → 5 лет; $5–10 млн → 7 лет; свыше $10 млн → 10 лет.
• Налог на имущество — освобождение по той же шкале, что и земельный.
• Налог за водные ресурсы — полное освобождение.
• Таможня: беспошлинный ввоз оборудования и стройматериалов, упрощённое оформление.

Подробнее — на странице «Льготы».`,
      en: `Tax incentives for Bekabad SEZ residents (Tax Code of Uzbekistan, Chapter 68, Article 473):

• Profit tax — full exemption: $3–5M → 3 years; $5–15M → 5 years; over $15M → 10 years.
• Land tax — full exemption: $0.3–3M → 3 years; $3–5M → 5 years; $5–10M → 7 years; over $10M → 10 years.
• Property tax — exempt on the same schedule as land tax.
• Water resources tax — full exemption.
• Customs: duty-free import of equipment and construction materials, simplified clearance.

See the "Incentives" page for details.`,
      zh: `别卡巴德经济特区居民的税收优惠（乌兹别克斯坦税法第68章第473条）：

• 企业所得税——全额免除：300–500万美元 → 3年；500–1500万美元 → 5年；1500万美元以上 → 10年。
• 土地税——全额免除：30–300万美元 → 3年；300–500万美元 → 5年；500–1000万美元 → 7年；1000万美元以上 → 10年。
• 财产税——按土地税相同期限免除。
• 水资源税——全额免除。
• 海关：设备和建筑材料免税进口，简化通关。

详情请见"优惠"页面。`,
    },
  },
  {
    keys: [
      'oybek', 'erkin savdo', 'texnopark', 'texnapark', 'chegara', 'tojikiston',
      'свободн', 'ойбек', 'технопарк', 'граница', 'таджикистан',
      'free trade', 'ftz', 'technopark', 'border', 'tajikistan',
      '奥伊别克', '自由贸易', '科技园', '边境', '塔吉克',
    ],
    answer: {
      uz: `"Oybek" erkin savdo zonasi:

• Oybek chegara postida joylashgan texnopark — O'zbekiston–Tojikiston asosiy quruqlik o'tish nuqtasi.
• Rezidentlar uchun 3–10 yillik soliq va bojxona imtiyozlari.
• Tayyor muhandislik infratuzilmasi.
• Xalqaro tranzit yo'laklariga to'g'ridan-to'g'ri kirish.

Batafsil "Oybek ESZ" sahifasida.`,
      ru: `Зона свободной торговли «Ойбек»:

• Технопарк на пограничном посту Ойбек — главном сухопутном переходе Узбекистан–Таджикистан.
• Налоговые и таможенные льготы на 3–10 лет для резидентов.
• Готовая инженерная инфраструктура.
• Прямой выход к международным транзитным коридорам.

Подробнее — на странице «Ойбек ЗСТ».`,
      en: `Oybek Free Trade Zone:

• A technopark at the Oybek border post — the main Uzbekistan–Tajikistan land crossing.
• 3–10 year tax and customs exemptions for residents.
• Ready-to-use engineering infrastructure.
• Direct access to international transit corridors.

See the "Oybek FTZ" page for details.`,
      zh: `奥伊别克自由贸易区：

• 位于奥伊别克边境口岸的科技园——乌兹别克斯坦与塔吉克斯坦的主要陆路口岸。
• 居民享受3–10年的税收和海关优惠。
• 现成的工程基础设施。
• 直接连接国际过境走廊。

详情请见"奥伊别克自贸区"页面。`,
    },
  },
  {
    keys: [
      'yangi o', "yangi o'zbek", 'turar joy', 'uy-joy', 'uy joy', 'kvartira',
      'новый узбекистан', 'жиль', 'жилой', 'квартир', 'residential', 'housing',
      'apartment', 'new uzbekistan', '新乌兹别克', '住宅', '公寓',
    ],
    answer: {
      uz: `Yangi O'zbekiston mahallasi — Bekobodda bunyod etilayotgan zamonaviy turar-joy tumani. Investitsiya hub doirasida uy-joy va zamonaviy hayot infratuzilmasini ta'minlaydi. Batafsil "Yangi O'zbekiston" sahifasida.`,
      ru: `Район «Янги Узбекистан» — современный жилой район, строящийся в Бекабаде в рамках инвестиционного хаба: жильё и современная инфраструктура. Подробнее — на странице «Янги Узбекистан».`,
      en: `The Yangi O'zbekiston district is a modern residential area being developed in Bekabad as part of the investment hub, providing housing and modern living infrastructure. See the "Yangi O'zbekiston" page for details.`,
      zh: `新乌兹别克斯坦区是作为投资中心一部分在别卡巴德开发的现代化住宅区，提供住房和现代生活基础设施。详情请见"新乌兹别克斯坦"页面。`,
    },
  },
  {
    keys: [
      'investitsiya', 'sarmoya', 'auksion', 'auktsion', 'ishtirok',
      'yer ijara', 'yer olish', 'ariza', 'инвест', 'аукцион', 'участ',
      'заявк', 'аренда земли', 'invest', 'auction', 'e-auction', 'apply',
      'application', 'participate', 'lease', '如何投资', '投资', '拍卖', '申请', '参与',
    ],
    answer: {
      uz: `Investitsiya tartibi:

1. Investorlar shaffof elektron auksionda (e-auksion) qatnashib, yer ijarasi huquqini yutib oladi.
2. Zarur hollarda yer huquqlari / yerdan foydalanish shartnomasi rasmiylashtiriladi.
3. Aniq lotlar, boshlang'ich narxlar va jarayonni boshlash uchun tegishli bo'lim yoki "Kontaktlar" sahifasidan foydalaning.

Auksionga o'tish uchun saytdagi "AUKSION" tugmasidan foydalaning.`,
      ru: `Порядок инвестирования:

1. Инвесторы участвуют в прозрачном электронном аукционе (э-аукцион) и получают право аренды земли.
2. При необходимости оформляются права на землю / договор землепользования.
3. Для конкретных лотов, стартовых цен и начала процесса используйте соответствующий раздел или страницу «Контакты».

Перейти к аукциону можно по кнопке «АУКЦИОН» на сайте.`,
      en: `How to invest:

1. Investors take part in a transparent electronic auction (e-auction) to win land-lease rights.
2. Where required, land rights / land-use agreements are registered.
3. For specific lots, starting prices, and to begin, use the relevant section or the "Contact" page.

Use the "AUCTION" button on the site to go to the auction.`,
      zh: `投资流程：

1. 投资者参加透明的电子拍卖（e-auction）以竞得土地租赁权。
2. 如需要，办理土地权利／土地使用协议登记。
3. 有关具体地块、起拍价及启动流程，请使用相关板块或"联系"页面。

点击网站上的"拍卖"按钮进入拍卖。`,
    },
  },
  {
    keys: [
      'sektor', 'soha', 'tarmoq', 'metallurg', 'farmatsevt', 'mashinasozlik',
      "to'qimachilik", 'oziq-ovqat', 'сектор', 'отрасл', 'металлург', 'фарма',
      'sector', 'industry', 'industries', 'metallurgy', 'pharma', 'machinery',
      'textile', '行业', '产业', '冶金', '医药', '纺织',
    ],
    answer: {
      uz: `Bekobod MIZ 8 ta strategik sohaga yo'naltirilgan: metallurgiya, farmatsevtika, mashinasozlik, qurilish materiallari, logistika va omborxona, oziq-ovqat sanoati, energetika, to'qimachilik.`,
      ru: `СЭЗ Бекабад ориентирована на 8 стратегических отраслей: металлургия, фармацевтика, машиностроение, стройматериалы, логистика и склады, пищевая промышленность, энергетика, текстиль.`,
      en: `Bekabad SEZ targets 8 strategic sectors: metallurgy, pharmaceuticals, machinery, building materials, logistics & warehousing, food industry, energy, and textiles.`,
      zh: `别卡巴德经济特区聚焦8个战略行业：冶金、制药、机械制造、建筑材料、物流与仓储、食品工业、能源和纺织。`,
    },
  },
  {
    keys: [
      'infratuzilma', 'podstansiya', 'elektr', 'suv', 'temir yo', 'quvvat',
      'инфраструктур', 'подстанц', 'электр', 'вода', 'железн', 'мощност',
      'infrastructure', 'substation', 'electric', 'power', 'water', 'railway',
      '基础设施', '变电站', '电力', '水', '铁路',
    ],
    answer: {
      uz: `Bekobod MIZ infratuzilmasi: elektr podstansiyasi (~80 MVt), suv rezervuarlari va zonani kesib o'tuvchi temir yo'l liniyasi. Rezidentlar birinchi kundanoq tayyor infratuzilmadan foydalanadi.`,
      ru: `Инфраструктура СЭЗ Бекабад: электроподстанция (~80 МВт), водные резервуары и железнодорожная линия через зону. Резиденты пользуются готовой инфраструктурой с первого дня.`,
      en: `Bekabad SEZ infrastructure: an electrical substation (~80 MW), water reservoirs, and a railway line crossing the zone. Residents get ready-to-use infrastructure from day one.`,
      zh: `别卡巴德经济特区基础设施：变电站（约80兆瓦）、水库以及穿越园区的铁路线。居民从第一天起即可使用现成的基础设施。`,
    },
  },
  {
    keys: [
      'miz', 'sez', 'maxsus iqtisod', 'erkin iqtisod', 'gektar', 'lot', 'lotlar',
      'сэз', 'особая экономич', 'гектар', 'лот', 'special economic', 'hectare',
      'zone', 'about', '经济特区', '公顷', '地块', '概况',
    ],
    answer: {
      uz: `Bekobod Maxsus iqtisodiy zonasi (MIZ):

• 397 gektar sanoat yeri.
• 120 ta investitsiya loti.
• 8 ta strategik soha.
• Yer ijarasi huquqi shaffof elektron auksion orqali beriladi.
• Tayyor infratuzilma: elektr podstansiyasi, suv rezervuarlari, temir yo'l.

Batafsil "Bekobod MIZ" sahifasida.`,
      ru: `Специальная экономическая зона (СЭЗ) Бекабад:

• 397 гектаров промышленной земли.
• 120 инвестиционных лотов.
• 8 стратегических отраслей.
• Право аренды земли — через прозрачный электронный аукцион.
• Готовая инфраструктура: электроподстанция, водные резервуары, железная дорога.

Подробнее — на странице «Бекабад СЭЗ».`,
      en: `Bekabad Special Economic Zone (SEZ):

• 397 hectares of industrial land.
• 120 investment lots.
• 8 strategic sectors.
• Land-lease rights via a transparent electronic auction.
• Ready infrastructure: electrical substation, water reservoirs, railway line.

See the "Bekabad SEZ" page for details.`,
      zh: `别卡巴德经济特区（SEZ）：

• 397公顷工业用地。
• 120个投资地块。
• 8个战略行业。
• 通过透明电子拍卖获得土地租赁权。
• 现成基础设施：变电站、水库、铁路线。

详情请见"别卡巴德经济特区"页面。`,
    },
  },
  {
    keys: [
      'aloqa', "bog'lan", 'telefon', 'manzil', 'email', 'pochta', 'kontakt',
      'контакт', 'связ', 'телефон', 'адрес', 'почт', 'contact', 'phone',
      'address', 'reach', 'call', '联系', '电话', '地址', '邮箱',
    ],
    answer: {
      uz: `Biz bilan bog'lanish uchun saytdagi "Aloqa" (Kontaktlar) sahifasidan foydalaning — u yerda telefon, elektron pochta va murojaat shakli mavjud. Aniq lotlar va ariza jarayoni bo'yicha ham shu orqali murojaat qiling.`,
      ru: `Чтобы связаться с нами, используйте страницу «Контакты» на сайте — там есть телефон, электронная почта и форма обращения. По конкретным лотам и подаче заявки обращайтесь туда же.`,
      en: `To reach us, use the "Contact" page on the site — it has a phone number, email, and an inquiry form. For specific lots and applications, please contact us there too.`,
      zh: `如需联系我们，请使用网站的"联系"页面——那里有电话、电子邮箱和咨询表单。有关具体地块和申请事宜也请通过该页面联系。`,
    },
  },
];

const GREETING_KEYS = [
  'salom', 'assalom', 'assalomu', 'hormang', 'hello', 'hi', 'hey',
  'здравств', 'привет', 'добрый', 'salam', '你好', '您好', '哈喽',
];

const GREETING: Answer = {
  uz: `Assalomu alaykum! Men Bekobod investitsiya hubi bo'yicha savollarga javob beraman: soliq imtiyozlari, Bekobod MIZ, "Oybek" ESZ, Yangi O'zbekiston va investitsiya tartibi. Nima bilan qiziqasiz?`,
  ru: `Здравствуйте! Я отвечаю на вопросы об инвестиционном хабе Бекабад: налоговые льготы, СЭЗ Бекабад, ЗСТ «Ойбек», Янги Узбекистан и порядок инвестирования. Что вас интересует?`,
  en: `Hello! I answer questions about the Bekabad investment hub: tax incentives, Bekabad SEZ, Oybek FTZ, Yangi O'zbekiston, and the investment process. What would you like to know?`,
  zh: `您好！我可以解答关于别卡巴德投资中心的问题：税收优惠、别卡巴德经济特区、奥伊别克自贸区、新乌兹别克斯坦以及投资流程。您想了解什么？`,
};

const FALLBACK: Answer = {
  uz: `Bu savolga aniq ma'lumotim yo'q. Men quyidagilar bo'yicha yordam bera olaman:

• Soliq imtiyozlari
• Bekobod MIZ (maxsus iqtisodiy zona)
• "Oybek" erkin savdo zonasi
• Yangi O'zbekiston mahallasi
• Investitsiya va auksion tartibi
• Infratuzilma va sohalar

Batafsil ma'lumot uchun "Aloqa" sahifasidan bog'laning.`,
  ru: `По этому вопросу у меня нет точной информации. Я могу помочь по темам:

• Налоговые льготы
• СЭЗ Бекабад
• Зона свободной торговли «Ойбек»
• Район Янги Узбекистан
• Порядок инвестирования и аукцион
• Инфраструктура и отрасли

Для подробностей воспользуйтесь страницей «Контакты».`,
  en: `I don't have exact information on that. I can help with:

• Tax incentives
• Bekabad SEZ
• Oybek Free Trade Zone
• Yangi O'zbekiston district
• Investing and the auction process
• Infrastructure and sectors

For details, please use the "Contact" page.`,
  zh: `我没有关于该问题的确切信息。我可以帮您了解：

• 税收优惠
• 别卡巴德经济特区
• 奥伊别克自由贸易区
• 新乌兹别克斯坦区
• 投资与拍卖流程
• 基础设施与行业

如需详情，请使用"联系"页面。`,
};

function answerFor(message: string, lang: Lang): string {
  const n = norm(message);
  for (const topic of TOPICS) {
    if (topic.keys.some((k) => n.includes(k))) return topic.answer[lang];
  }
  if (GREETING_KEYS.some((k) => n.includes(k))) return GREETING[lang];
  return FALLBACK[lang];
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const rawMessages = Array.isArray(data.messages) ? data.messages : null;
  if (!rawMessages || rawMessages.length === 0) {
    return NextResponse.json({ error: 'Missing messages' }, { status: 400 });
  }

  // Only the latest user message drives the answer.
  let lastUser = '';
  for (let i = rawMessages.length - 1; i >= 0; i--) {
    const m = rawMessages[i] as Record<string, unknown>;
    if (m.role !== 'assistant') {
      lastUser = String(m.content ?? '').trim().slice(0, MAX_CHARS);
      break;
    }
  }
  if (!lastUser) {
    return NextResponse.json({ error: 'Invalid conversation' }, { status: 400 });
  }

  const lang = detectLang(lastUser, data.language);
  const reply = answerFor(lastUser, lang);
  return NextResponse.json({ reply });
}
