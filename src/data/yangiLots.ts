// ---------------------------------------------------------------------------
// Yangi O'zbekiston — interactive lot map data
// ---------------------------------------------------------------------------
// Lot numbers, areas, status and price live HERE. Polygon coordinates (the
// perimeter of each lot over public/yangi_aerial.png) live in the companion
// file `yangiLots.coords.json` and are merged in below.
//
// EDIT THE PERIMETERS VISUALLY: open  /yangi-uzbekistan/edit  (dev only),
// drag the vertices / whole lot, then press "Save" — it writes the coords JSON.
//
// EDIT BY HAND:
//  • Price   → add  price: '12.5 mlrd UZS'  to a lot below.
//  • Status  → 'pending' | 'available' | 'sold'  (drives the zone color).
//  • Area / number → here. Coordinates → yangiLots.coords.json (or the editor).
// ---------------------------------------------------------------------------
import coordsJson from './yangiLots.coords.json';

export type LotStatus = 'pending' | 'available' | 'sold';
export type LotCategory = 'residential' | 'commercial';

export interface Lot {
  /** Lot number shown in the tooltip */
  id: string;
  /** Residential (turar joy) or commercial (noturar) — numbered separately */
  category: LotCategory;
  /** Polygon outline as [x%, y%] pairs over the image (from coords JSON) */
  points: [number, number][];
  /** Plot area, e.g. "1.53 ga" */
  area: string;
  /** Sale status — drives the zone color */
  status: LotStatus;
  /** Optional sale price / auction starting bid, e.g. "12.5 mlrd UZS" */
  price?: string;
  /** Optional caption (intended use) shown in the tooltip */
  use?: string;
  /** Optional direct e-auction link for this exact lot */
  auctionUrl?: string;
  /** True = not drawn on the aerial (out of frame) — shown in a separate list */
  offMap?: boolean;
}

// Status -> color (fill, border, legend). Tweak centrally here.
export const LOT_STATUS_COLOR: Record<LotStatus, string> = {
  pending: '#00e5ff', // neon cyan — kutilmoqda / в ожидании (not yet on auction)
  available: '#4a9c4e', // green  — auksionda / на аукционе
  sold: '#94a3b8', // slate  — sotilgan / продан
};

export const DEFAULT_AUCTION_URL = 'https://e-auksion.uz';

// Unique key used to look up a lot's polygon in the coords JSON.
export const lotKey = (l: Pick<Lot, 'category' | 'id'>) => `${l.category}-${l.id}`;

const coords = coordsJson as unknown as Record<string, [number, number][]>;

// Lot metadata (number / area / status / price). Coordinates merged from JSON.
type LotMeta = Omit<Lot, 'points'>;

const LOTS_META: LotMeta[] = [
  // ── Turar joy binolari (residential) 1-70 — Book1.xlsx ('Turar') ──
  { id: '1', category: 'residential', use: 'Turar joy: 4×5 qavat, 1×7 qavat', area: '1700 m²', status: 'pending' },
  { id: '2', category: 'residential', use: 'Turar joy: 3×5 qavat, 1×7 qavat', area: '1360 m²', status: 'pending' },
  { id: '3', category: 'residential', use: 'Turar joy: 2×7 qavat', area: '680 m²', status: 'pending' },
  { id: '4', category: 'residential', use: 'Turar joy: 3×5 qavat, 1×7 qavat', area: '1360 m²', status: 'pending' },
  { id: '5', category: 'residential', use: 'Turar joy: 4×5 qavat, 1×7 qavat', area: '1700 m²', status: 'pending' },
  { id: '6', category: 'residential', use: 'Turar joy: 4×5 qavat, 1×7 qavat', area: '1700 m²', status: 'pending' },
  { id: '7', category: 'residential', use: 'Turar joy: 3×5 qavat, 1×7 qavat', area: '1360 m²', status: 'pending' },
  { id: '8', category: 'residential', use: 'Turar joy: 2×7 qavat', area: '680 m²', status: 'pending' },
  { id: '9', category: 'residential', use: 'Turar joy: 4×5 qavat, 1×7 qavat', area: '1700 m²', status: 'pending' },
  { id: '10', category: 'residential', use: 'Turar joy: 3×5 qavat, 1×7 qavat', area: '1360 m²', status: 'pending' },
  { id: '11', category: 'residential', use: 'Turar joy: 3×7 qavat, 1×9 qavat', area: '1360 m²', status: 'pending' },
  { id: '12', category: 'residential', use: 'Turar joy: 5×7 qavat', area: '1700 m²', status: 'pending' },
  { id: '13', category: 'residential', use: 'Turar joy: 3×7 qavat, 1×9 qavat', area: '1360 m²', status: 'pending' },
  { id: '14', category: 'residential', use: 'Turar joy: 4×5 qavat, 2×7 qavat, 2×9 qavat', area: '2720 m²', status: 'pending' },
  { id: '15', category: 'residential', use: 'Turar joy: 2×7 qavat', area: '680 m²', status: 'pending' },
  { id: '16', category: 'residential', use: 'Turar joy: 4×7 qavat, 2×9 qavat', area: '2040 m²', status: 'pending' },
  { id: '17', category: 'residential', use: 'Turar joy: 3×7 qavat, 1×9 qavat', area: '1360 m²', status: 'pending' },
  { id: '18', category: 'residential', use: 'Turar joy: 3×7 qavat, 1×9 qavat', area: '1360 m²', status: 'pending' },
  { id: '19', category: 'residential', use: 'Turar joy: 5×7 qavat', area: '1700 m²', status: 'pending' },
  { id: '20', category: 'residential', use: 'Turar joy: 3×7 qavat, 1×9 qavat', area: '1360 m²', status: 'pending' },
  { id: '21', category: 'residential', use: 'Turar joy: 2×7 qavat', area: '680 m²', status: 'pending' },
  { id: '22', category: 'residential', use: 'Turar joy: 2×7 qavat, 1×9 qavat', area: '1020 m²', status: 'pending' },
  { id: '23', category: 'residential', use: 'Turar joy: 2×7 qavat', area: '680 m²', status: 'pending' },
  { id: '24', category: 'residential', use: 'Turar joy: 2×7 qavat, 1×9 qavat', area: '1020 m²', status: 'pending' },
  { id: '25', category: 'residential', use: 'Turar joy: 2×7 qavat', area: '680 m²', status: 'pending' },
  { id: '26', category: 'residential', use: 'Turar joy: 3×7 qavat, 1×9 qavat', area: '1360 m²', status: 'pending' },
  { id: '27', category: 'residential', use: 'Turar joy: 3×7 qavat, 1×9 qavat', area: '1360 m²', status: 'pending' },
  { id: '28', category: 'residential', use: 'Turar joy: 2×7 qavat', area: '680 m²', status: 'pending' },
  { id: '29', category: 'residential', use: 'Turar joy: 5×7 qavat, 2×9 qavat', area: '2380 m²', status: 'pending' },
  { id: '30', category: 'residential', use: 'Turar joy: 2×7 qavat', area: '680 m²', status: 'pending' },
  { id: '31', category: 'residential', use: 'Turar joy: 2×7 qavat', area: '680 m²', status: 'pending' },
  { id: '32', category: 'residential', use: 'Turar joy: 3×7 qavat, 1×9 qavat', area: '1360 m²', status: 'pending' },
  { id: '33', category: 'residential', use: 'Turar joy: 2×7 qavat', area: '680 m²', status: 'pending' },
  { id: '34', category: 'residential', use: 'Turar joy: 3×7 qavat, 1×9 qavat', area: '1360 m²', status: 'pending' },
  { id: '35', category: 'residential', use: 'Turar joy: 5×7 qavat, 2×9 qavat', area: '2380 m²', status: 'pending' },
  { id: '36', category: 'residential', use: 'Turar joy: 3×7 qavat, 1×9 qavat', area: '1360 m²', status: 'pending' },
  { id: '37', category: 'residential', use: 'Turar joy: 3×7 qavat, 1×9 qavat', area: '1360 m²', status: 'pending' },
  { id: '38', category: 'residential', use: 'Turar joy: 5×7 qavat, 2×9 qavat', area: '2380 m²', status: 'pending' },
  { id: '39', category: 'residential', use: 'Turar joy: 3×7 qavat, 1×9 qavat', area: '1360 m²', status: 'pending' },
  { id: '40', category: 'residential', use: 'Turar joy: 2×7 qavat', area: '680 m²', status: 'pending' },
  { id: '41', category: 'residential', use: 'Turar joy: 3×7 qavat, 1×9 qavat', area: '1360 m²', status: 'pending' },
  { id: '42', category: 'residential', use: 'Turar joy: 2×7 qavat', area: '680 m²', status: 'pending' },
  { id: '43', category: 'residential', use: 'Turar joy: 5×7 qavat, 2×9 qavat', area: '2380 m²', status: 'pending' },
  { id: '44', category: 'residential', use: 'Turar joy: 2×7 qavat', area: '680 m²', status: 'pending' },
  { id: '45', category: 'residential', use: 'Turar joy: 3×7 qavat, 1×9 qavat', area: '1360 m²', status: 'pending' },
  { id: '46', category: 'residential', use: 'Turar joy: 2×7 qavat', area: '680 m²', status: 'pending' },
  { id: '47', category: 'residential', use: 'Turar joy: 3×5 qavat, 1×7 qavat', area: '1360 m²', status: 'pending' },
  { id: '48', category: 'residential', use: 'Turar joy: 2×5 qavat, 1×7 qavat', area: '1020 m²', status: 'pending' },
  { id: '49', category: 'residential', use: 'Turar joy: 3×5 qavat, 1×7 qavat', area: '1360 m²', status: 'pending' },
  { id: '50', category: 'residential', use: 'Turar joy: 4×5 qavat, 2×7 qavat', area: '2040 m²', status: 'pending' },
  { id: '51', category: 'residential', use: 'Turar joy: 5×5 qavat, 2×7 qavat', area: '2380 m²', status: 'pending' },
  { id: '52', category: 'residential', use: 'Turar joy: 3×5 qavat, 2×7 qavat', area: '1700 m²', status: 'pending' },
  { id: '53', category: 'residential', use: 'Turar joy: 2×5 qavat, 1×7 qavat', area: '1020 m²', status: 'pending' },
  { id: '54', category: 'residential', use: 'Turar joy: 3×5 qavat, 1×7 qavat', area: '1360 m²', status: 'pending' },
  { id: '55', category: 'residential', use: 'Turar joy: 2×7 qavat', area: '680 m²', status: 'pending' },
  { id: '56', category: 'residential', use: 'Turar joy: 3×7 qavat, 1×9 qavat', area: '1360 m²', status: 'pending' },
  { id: '57', category: 'residential', use: 'Turar joy: 5×7 qavat, 2×9 qavat', area: '2380 m²', status: 'pending' },
  { id: '58', category: 'residential', use: 'Turar joy: 2×7 qavat', area: '680 m²', status: 'pending' },
  { id: '59', category: 'residential', use: 'Turar joy: 2×7 qavat', area: '680 m²', status: 'pending' },
  { id: '60', category: 'residential', use: 'Turar joy: 3×7 qavat, 1×9 qavat', area: '1360 m²', status: 'pending' },
  { id: '61', category: 'residential', use: 'Turar joy: 3×5 qavat, 1×7 qavat', area: '1360 m²', status: 'pending' },
  { id: '62', category: 'residential', use: 'Turar joy: 3×5 qavat, 1×7 qavat', area: '1360 m²', status: 'pending' },
  { id: '63', category: 'residential', use: 'Turar joy: 2×7 qavat', area: '680 m²', status: 'pending' },
  { id: '64', category: 'residential', use: 'Turar joy: 4×5 qavat, 1×7 qavat', area: '1700 m²', status: 'pending' },
  { id: '65', category: 'residential', use: 'Turar joy: 4×5 qavat, 1×7 qavat', area: '1700 m²', status: 'pending' },
  { id: '66', category: 'residential', use: 'Turar joy: 4×5 qavat, 1×7 qavat', area: '1700 m²', status: 'pending' },
  { id: '67', category: 'residential', use: 'Turar joy: 3×5 qavat, 1×7 qavat', area: '1360 m²', status: 'pending' },
  { id: '68', category: 'residential', use: 'Turar joy: 2×7 qavat', area: '680 m²', status: 'pending' },
  { id: '69', category: 'residential', use: 'Turar joy: 2×5 qavat, 1×7 qavat', area: '1020 m²', status: 'pending' },
  { id: '70', category: 'residential', use: 'Turar joy: 3×5 qavat, 1×7 qavat', area: '1360 m²', status: 'pending' },
  // ── Noturar binolari (commercial) 1-36 (no 26) — Book1.xlsx ('NoTurar') ──
  { id: '1', category: 'commercial', use: 'Korzinka', area: '2082 m²', status: 'pending' },
  { id: '2', category: 'commercial', use: 'Avtoshoxbekat', area: '468 m²', status: 'pending' },
  { id: '3', category: 'commercial', use: 'Ekobozor', area: '5376 m²', status: 'pending' },
  { id: '4', category: 'commercial', use: 'Restaurant', area: '2020 m²', status: 'pending' },
  { id: '5', category: 'commercial', use: '24/7 do\'kon', area: '1132 m²', status: 'pending' },
  { id: '6', category: 'commercial', use: '24/7 do\'kon', area: '1421 m²', status: 'pending' },
  { id: '7', category: 'commercial', use: '24/7 do\'kon', area: '1132 m²', status: 'pending' },
  { id: '8', category: 'commercial', use: '24/7 do\'kon', area: '1661 m²', status: 'pending' },
  { id: '9', category: 'commercial', use: '24/7 do\'kon', area: '1132 m²', status: 'pending' },
  { id: '10', category: 'commercial', use: '24/7 do\'kon', area: '950 m²', status: 'pending' },
  { id: '11', category: 'commercial', use: 'Tikuvchilik korxonasi', area: '2000 m²', status: 'pending' },
  { id: '12', category: 'commercial', use: 'Ipoteka sanoat kompleksi', area: '1440 m²', status: 'pending' },
  { id: '13', category: 'commercial', use: 'Ipoteka sanoat kompleksi', area: '1440 m²', status: 'pending' },
  { id: '14', category: 'commercial', use: 'Ipoteka sanoat kompleksi', area: '1440 m²', status: 'pending' },
  { id: '15', category: 'commercial', use: 'Ipoteka sanoat kompleksi', area: '1296 m²', status: 'pending' },
  { id: '16', category: 'commercial', use: 'Ipoteka sanoat kompleksi', area: '1296 m²', status: 'pending' },
  { id: '17', category: 'commercial', use: 'Ipoteka sanoat kompleksi', area: '1440 m²', status: 'pending' },
  { id: '18', category: 'commercial', use: 'Ipoteka sanoat kompleksi', area: '450 m²', status: 'pending' },
  { id: '19', category: 'commercial', use: 'Ipoteka sanoat kompleksi', area: '864 m²', status: 'pending' },
  { id: '20', category: 'commercial', use: 'Intensiv baliqchilik kompleksi', area: '1910 m²', status: 'pending' },
  { id: '21', category: 'commercial', use: 'Ipoteka sanoat kompleksi', area: '450 m²', status: 'pending' },
  { id: '22', category: 'commercial', use: 'Ipoteka sanoat kompleksi', area: '864 m²', status: 'pending' },
  { id: '23', category: 'commercial', use: 'Ipoteka sanoat kompleksi', area: '864 m²', status: 'pending' },
  { id: '24', category: 'commercial', use: 'Ipoteka sanoat kompleksi', area: '864 m²', status: 'pending' },
  { id: '25', category: 'commercial', use: 'Ipoteka sanoat kompleksi', area: '864 m²', status: 'pending' },
  { id: '26', category: 'commercial', use: 'Ta\'lim va tibbiyot maskani', area: '1511 m²', status: 'pending' },
  { id: '27', category: 'commercial', use: 'Ta\'lim va tibbiyot maskani', area: '1511 m²', status: 'pending' },
  { id: '28', category: 'commercial', use: 'Ta\'lim va tibbiyot maskani', area: '1511 m²', status: 'pending' },
  { id: '29', category: 'commercial', use: 'Ta\'lim va tibbiyot maskani', area: '1511 m²', status: 'pending' },
  { id: '30', category: 'commercial', use: 'Xususiy ta\'lim Markazi', area: '5095 m²', status: 'pending' },
  { id: '31', category: 'commercial', use: 'Universal sport majmuasi', area: '3560 m²', status: 'pending' },
  { id: '32', category: 'commercial', use: 'Maktabgacha ta\'lim muassasasi', area: '1115 m²', status: 'pending' },
  { id: '33', category: 'commercial', use: 'Umumiy o\'rta maktab', area: '2400 m²', status: 'pending' },
  { id: '34', category: 'commercial', use: 'Maktabgacha ta\'lim muassasasi', area: '1115 m²', status: 'pending' },
  { id: '35', category: 'commercial', use: '2 qavatli ofis-savdo binosi', area: '1500 m²', status: 'pending' },
  { id: '36', category: 'commercial', use: '2 qavatli ofis-savdo binosi', area: '1500 m²', status: 'pending' },
  { id: '37', category: 'commercial', use: '2 qavatli ofis-savdo binosi', area: '1421 m²', status: 'pending' },
  { id: '38', category: 'commercial', use: '2 qavatli ofis-savdo binosi', area: '1421 m²', status: 'pending' },
];

export const YANGI_LOTS: Lot[] = LOTS_META.map((m) => ({
  ...m,
  points: coords[lotKey(m)] ?? [],
}));
