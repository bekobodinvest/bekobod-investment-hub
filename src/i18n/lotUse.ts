// ---------------------------------------------------------------------------
// Localization for lot "use" captions (building type / facility name).
// The source data in yangiLots.ts is Uzbek; this maps it to en / ru / zh.
// Residential lots use a "Turar joy: 4×5 qavat, 1×7 qavat" pattern — we
// translate the "Turar joy" prefix and the "qavat" (floor) unit, keeping the
// composition numbers as-is. Commercial names are looked up in COMMERCIAL.
// ---------------------------------------------------------------------------
import { Language } from './translations';

const COMMERCIAL: Record<string, Partial<Record<Language, string>>> = {
  '2 qavatli ofis-savdo binosi': {
    ru: '2-этажное офисно-торговое здание',
    en: '2-storey office & retail building',
    zh: '2层办公商业楼',
  },
  "24/7 do'kon": { ru: 'Магазин 24/7', en: '24/7 store', zh: '24/7便利店' },
  Avtoshoxbekat: { ru: 'Автовокзал', en: 'Bus station', zh: '汽车客运站' },
  Ekobozor: { ru: 'Эко-базар', en: 'Eco-market', zh: '生态市场' },
  'Intensiv baliqchilik kompleksi': {
    ru: 'Комплекс интенсивного рыбоводства',
    en: 'Intensive fish-farming complex',
    zh: '集约化养鱼综合体',
  },
  'Ipoteka sanoat kompleksi': {
    ru: 'Ипотечно-промышленный комплекс',
    en: 'Mortgage industrial complex',
    zh: '抵押工业综合体',
  },
  Korzinka: { ru: 'Корзинка (супермаркет)', en: 'Korzinka (supermarket)', zh: 'Korzinka 超市' },
  "Maktabgacha ta'lim muassasasi": {
    ru: 'Дошкольное учреждение (детсад)',
    en: 'Kindergarten',
    zh: '幼儿园',
  },
  Restaurant: { ru: 'Ресторан', en: 'Restaurant', zh: '餐厅' },
  "Ta'lim va tibbiyot maskani": {
    ru: 'Образовательно-медицинский центр',
    en: 'Education & healthcare facility',
    zh: '教育医疗中心',
  },
  'Tikuvchilik korxonasi': { ru: 'Швейное предприятие', en: 'Garment factory', zh: '制衣厂' },
  "Umumiy o'rta maktab": { ru: 'Общеобразовательная школа', en: 'Secondary school', zh: '普通中学' },
  'Universal sport majmuasi': {
    ru: 'Универсальный спорткомплекс',
    en: 'Universal sports complex',
    zh: '综合体育中心',
  },
  "Xususiy ta'lim Markazi": {
    ru: 'Частный учебный центр',
    en: 'Private education center',
    zh: '私立教育中心',
  },
};

const RESID_PREFIX: Record<Language, string> = {
  uz: 'Turar joy',
  en: 'Residential building',
  ru: 'Жилой дом',
  zh: '住宅楼',
};

const FLOOR: Record<Language, string> = { uz: 'qavat', en: 'fl.', ru: 'эт.', zh: '层' };

/** Translate a lot's Uzbek `use` caption into the active language. */
export function localizeUse(use: string | undefined, lang: Language): string | undefined {
  if (!use || lang === 'uz') return use;
  if (use.startsWith('Turar joy')) {
    return use.replace('Turar joy', RESID_PREFIX[lang]).replace(/qavat/g, FLOOR[lang]);
  }
  return COMMERCIAL[use]?.[lang] ?? use;
}
