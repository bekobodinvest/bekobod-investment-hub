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
//  • Status  → 'available' | 'reserved' | 'sold'  (drives the zone color).
//  • Area / number → here. Coordinates → yangiLots.coords.json (or the editor).
// ---------------------------------------------------------------------------
import coordsJson from './yangiLots.coords.json';

export type LotStatus = 'available' | 'reserved' | 'sold';
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
}

// Status -> color (fill, border, legend). Tweak centrally here.
export const LOT_STATUS_COLOR: Record<LotStatus, string> = {
  available: '#4a9c4e', // green  — bo'sh / свободен
  reserved: '#f59e0b', // amber  — band / в резерве
  sold: '#94a3b8', // slate  — sotilgan / продан
};

export const DEFAULT_AUCTION_URL = 'https://e-auksion.uz';

// Unique key used to look up a lot's polygon in the coords JSON.
export const lotKey = (l: Pick<Lot, 'category' | 'id'>) => `${l.category}-${l.id}`;

const coords = coordsJson as unknown as Record<string, [number, number][]>;

// Lot metadata (number / area / status / price). Coordinates merged from JSON.
type LotMeta = Omit<Lot, 'points'>;

const LOTS_META: LotMeta[] = [
  // ── Turar joy binolari (residential) — lots 1-61 ──
  { id: '1', category: 'residential', use: 'Turar joy binosi', area: '1.53 ga', status: 'available' },
  { id: '2', category: 'residential', use: 'Turar joy binosi', area: '0.76 ga', status: 'available' },
  { id: '3', category: 'residential', use: 'Turar joy binosi', area: '0.73 ga', status: 'available' },
  { id: '4', category: 'residential', use: 'Turar joy binosi', area: '0.55 ga', status: 'available' },
  { id: '5', category: 'residential', use: 'Turar joy binosi', area: '0.53 ga', status: 'available' },
  { id: '6', category: 'residential', use: 'Turar joy binosi', area: '1.58 ga', status: 'available' },
  { id: '7', category: 'residential', use: 'Turar joy binosi', area: '1.09 ga', status: 'available' },
  { id: '8', category: 'residential', use: 'Turar joy binosi', area: '0.63 ga', status: 'available' },
  { id: '9', category: 'residential', use: 'Turar joy binosi', area: '0.98 ga', status: 'available' },
  { id: '10', category: 'residential', use: 'Turar joy binosi', area: '1.18 ga', status: 'available' },
  { id: '11', category: 'residential', use: 'Turar joy binosi', area: '1.02 ga', status: 'available' },
  { id: '12', category: 'residential', use: 'Turar joy binosi', area: '0.58 ga', status: 'available' },
  { id: '13', category: 'residential', use: 'Turar joy binosi', area: '0.58 ga', status: 'available' },
  { id: '14', category: 'residential', use: 'Turar joy binosi', area: '0.35 ga', status: 'available' },
  { id: '15', category: 'residential', use: 'Turar joy binosi', area: '0.76 ga', status: 'available' },
  { id: '16', category: 'residential', use: 'Turar joy binosi', area: '0.58 ga', status: 'available' },
  { id: '17', category: 'residential', use: 'Turar joy binosi', area: '0.53 ga', status: 'available' },
  { id: '18', category: 'residential', use: 'Turar joy binosi', area: '0.31 ga', status: 'available' },
  { id: '19', category: 'residential', use: 'Turar joy binosi', area: '0.57 ga', status: 'available' },
  { id: '20', category: 'residential', use: 'Turar joy binosi', area: '0.82 ga', status: 'available' },
  { id: '21', category: 'residential', use: 'Turar joy binosi', area: '0.62 ga', status: 'available' },
  { id: '22', category: 'residential', use: 'Turar joy binosi', area: '2.1 ga', status: 'available' },
  { id: '23', category: 'residential', use: 'Turar joy binosi', area: '0.36 ga', status: 'available' },
  { id: '24', category: 'residential', use: 'Turar joy binosi', area: '0.58 ga', status: 'available' },
  { id: '25', category: 'residential', use: 'Turar joy binosi', area: '0.41 ga', status: 'available' },
  { id: '26', category: 'residential', use: 'Turar joy binosi', area: '0.48 ga', status: 'available' },
  { id: '27', category: 'residential', use: 'Turar joy binosi', area: '0.94 ga', status: 'available' },
  { id: '28', category: 'residential', use: 'Turar joy binosi', area: '0.64 ga', status: 'available' },
  { id: '29', category: 'residential', use: 'Turar joy binosi', area: '0.64 ga', status: 'available' },
  { id: '30', category: 'residential', use: 'Turar joy binosi', area: '0.94 ga', status: 'available' },
  { id: '31', category: 'residential', use: 'Turar joy binosi', area: '0.48 ga', status: 'available' },
  { id: '32', category: 'residential', use: 'Turar joy binosi', area: '0.59 ga', status: 'available' },
  { id: '33', category: 'residential', use: 'Turar joy binosi', area: '1.35 ga', status: 'available' },
  { id: '34', category: 'residential', use: 'Turar joy binosi', area: '0.59 ga', status: 'available' },
  { id: '35', category: 'residential', use: 'Turar joy binosi', area: '2.1 ga', status: 'available' },
  { id: '36', category: 'residential', use: 'Turar joy binosi', area: '0.62 ga', status: 'available' },
  { id: '37', category: 'residential', use: 'Turar joy binosi', area: '0.83 ga', status: 'available' },
  { id: '38', category: 'residential', use: 'Turar joy binosi', area: '0.57 ga', status: 'available' },
  { id: '39', category: 'residential', use: 'Turar joy binosi', area: '0.41 ga', status: 'available' },
  { id: '40', category: 'residential', use: 'Turar joy binosi', area: '0.58 ga', status: 'available' },
  { id: '41', category: 'residential', use: 'Turar joy binosi', area: '0.36 ga', status: 'available' },
  { id: '42', category: 'residential', use: 'Turar joy binosi', area: '0.63 ga', status: 'available' },
  { id: '43', category: 'residential', use: 'Turar joy binosi', area: '0.63 ga', status: 'available' },
  { id: '44', category: 'residential', use: 'Turar joy binosi', area: '0.81 ga', status: 'available' },
  { id: '45', category: 'residential', use: 'Turar joy binosi', area: '0.62 ga', status: 'available' },
  { id: '46', category: 'residential', use: 'Turar joy binosi', area: '0.64 ga', status: 'available' },
  { id: '47', category: 'residential', use: 'Turar joy binosi', area: '0.46 ga', status: 'available' },
  { id: '48', category: 'residential', use: 'Turar joy binosi', area: '1.21 ga', status: 'available' },
  { id: '49', category: 'residential', use: 'Turar joy binosi', area: '0.46 ga', status: 'available' },
  { id: '50', category: 'residential', use: 'Turar joy binosi', area: '0.53 ga', status: 'available' },
  { id: '51', category: 'residential', use: 'Turar joy binosi', area: '0.76 ga', status: 'available' },
  { id: '52', category: 'residential', use: 'Turar joy binosi', area: '0.58 ga', status: 'available' },
  { id: '53', category: 'residential', use: 'Turar joy binosi', area: '0.31 ga', status: 'available' },
  { id: '54', category: 'residential', use: 'Turar joy binosi', area: '0.59 ga', status: 'available' },
  { id: '55', category: 'residential', use: 'Turar joy binosi', area: '0.35 ga', status: 'available' },
  { id: '56', category: 'residential', use: 'Turar joy binosi', area: '1.55 ga', status: 'available' },
  { id: '57', category: 'residential', use: 'Turar joy binosi', area: '0.64 ga', status: 'available' },
  { id: '58', category: 'residential', use: 'Turar joy binosi', area: '0.6 ga', status: 'available' },
  { id: '59', category: 'residential', use: 'Turar joy binosi', area: '0.84 ga', status: 'available' },
  { id: '60', category: 'residential', use: 'Turar joy binosi', area: '0.76 ga', status: 'available' },
  { id: '61', category: 'residential', use: 'Turar joy binosi', area: '1.3 ga', status: 'available' },
  // ── Noturar binolari (commercial) — lots 1-16 ──
  { id: '1', category: 'commercial', use: 'Noturar bino', area: '0.98 ga', status: 'available' },
  { id: '2', category: 'commercial', use: 'Noturar bino', area: '1.56 ga', status: 'available' },
  { id: '3', category: 'commercial', use: 'Noturar bino', area: '1.61 ga', status: 'available' },
  { id: '4', category: 'commercial', use: 'Noturar bino', area: '0.725 ga', status: 'available' },
  { id: '5', category: 'commercial', use: 'Noturar bino', area: '0.26 ga', status: 'available' },
  { id: '6', category: 'commercial', use: 'Noturar bino', area: '0.31 ga', status: 'available' },
  { id: '7', category: 'commercial', use: 'Noturar bino', area: '0.25 ga', status: 'available' },
  { id: '8', category: 'commercial', use: 'Noturar bino', area: '0.235 ga', status: 'available' },
  { id: '9', category: 'commercial', use: 'Noturar bino', area: '0.41 ga', status: 'available' },
  { id: '10', category: 'commercial', use: 'Noturar bino', area: '0.218 ga', status: 'available' },
  { id: '11', category: 'commercial', use: 'Noturar bino', area: '0.976 ga', status: 'available' },
  { id: '12', category: 'commercial', use: 'Noturar bino', area: '3.117 ga', status: 'available' },
  { id: '13', category: 'commercial', use: 'Noturar bino', area: '2.52 ga', status: 'available' },
  { id: '14', category: 'commercial', use: 'Noturar bino', area: '1.65 ga', status: 'available' },
  { id: '15', category: 'commercial', use: 'Noturar bino', area: '2.11 ga', status: 'available' },
  { id: '16', category: 'commercial', use: 'Noturar bino', area: '0.41 ga', status: 'available' },
];

export const YANGI_LOTS: Lot[] = LOTS_META.map((m) => ({
  ...m,
  points: coords[lotKey(m)] ?? [],
}));
