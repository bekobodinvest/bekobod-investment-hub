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
}

// Status -> color (fill, border, legend). Tweak centrally here.
export const LOT_STATUS_COLOR: Record<LotStatus, string> = {
  pending: '#f59e0b', // amber  — kutilmoqda / в ожидании (not yet on auction)
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
  // ── Turar joy binolari (residential) — lots 1-61 ──
  { id: '1', category: 'residential', use: 'Turar joy binosi', area: '1.53 ga', status: 'pending' },
  { id: '2', category: 'residential', use: 'Turar joy binosi', area: '0.76 ga', status: 'pending' },
  { id: '3', category: 'residential', use: 'Turar joy binosi', area: '0.73 ga', status: 'pending' },
  { id: '4', category: 'residential', use: 'Turar joy binosi', area: '0.55 ga', status: 'pending' },
  { id: '5', category: 'residential', use: 'Turar joy binosi', area: '0.53 ga', status: 'pending' },
  { id: '6', category: 'residential', use: 'Turar joy binosi', area: '1.58 ga', status: 'pending' },
  { id: '7', category: 'residential', use: 'Turar joy binosi', area: '1.09 ga', status: 'pending' },
  { id: '8', category: 'residential', use: 'Turar joy binosi', area: '0.63 ga', status: 'pending' },
  { id: '9', category: 'residential', use: 'Turar joy binosi', area: '0.98 ga', status: 'pending' },
  { id: '10', category: 'residential', use: 'Turar joy binosi', area: '1.18 ga', status: 'pending' },
  { id: '11', category: 'residential', use: 'Turar joy binosi', area: '1.02 ga', status: 'pending' },
  { id: '12', category: 'residential', use: 'Turar joy binosi', area: '0.58 ga', status: 'pending' },
  { id: '13', category: 'residential', use: 'Turar joy binosi', area: '0.58 ga', status: 'pending' },
  { id: '14', category: 'residential', use: 'Turar joy binosi', area: '0.35 ga', status: 'pending' },
  { id: '15', category: 'residential', use: 'Turar joy binosi', area: '0.76 ga', status: 'pending' },
  { id: '16', category: 'residential', use: 'Turar joy binosi', area: '0.58 ga', status: 'pending' },
  { id: '17', category: 'residential', use: 'Turar joy binosi', area: '0.53 ga', status: 'pending' },
  { id: '18', category: 'residential', use: 'Turar joy binosi', area: '0.31 ga', status: 'pending' },
  { id: '19', category: 'residential', use: 'Turar joy binosi', area: '0.57 ga', status: 'pending' },
  { id: '20', category: 'residential', use: 'Turar joy binosi', area: '0.82 ga', status: 'pending' },
  { id: '21', category: 'residential', use: 'Turar joy binosi', area: '0.62 ga', status: 'pending' },
  { id: '22', category: 'residential', use: 'Turar joy binosi', area: '2.1 ga', status: 'pending' },
  { id: '23', category: 'residential', use: 'Turar joy binosi', area: '0.36 ga', status: 'pending' },
  { id: '24', category: 'residential', use: 'Turar joy binosi', area: '0.58 ga', status: 'pending' },
  { id: '25', category: 'residential', use: 'Turar joy binosi', area: '0.41 ga', status: 'pending' },
  { id: '26', category: 'residential', use: 'Turar joy binosi', area: '0.48 ga', status: 'pending' },
  { id: '27', category: 'residential', use: 'Turar joy binosi', area: '0.94 ga', status: 'pending' },
  { id: '28', category: 'residential', use: 'Turar joy binosi', area: '0.64 ga', status: 'pending' },
  { id: '29', category: 'residential', use: 'Turar joy binosi', area: '0.64 ga', status: 'pending' },
  { id: '30', category: 'residential', use: 'Turar joy binosi', area: '0.94 ga', status: 'pending' },
  { id: '31', category: 'residential', use: 'Turar joy binosi', area: '0.48 ga', status: 'pending' },
  { id: '32', category: 'residential', use: 'Turar joy binosi', area: '0.59 ga', status: 'pending' },
  { id: '33', category: 'residential', use: 'Turar joy binosi', area: '1.35 ga', status: 'pending' },
  { id: '34', category: 'residential', use: 'Turar joy binosi', area: '0.59 ga', status: 'pending' },
  { id: '35', category: 'residential', use: 'Turar joy binosi', area: '2.1 ga', status: 'pending' },
  { id: '36', category: 'residential', use: 'Turar joy binosi', area: '0.62 ga', status: 'pending' },
  { id: '37', category: 'residential', use: 'Turar joy binosi', area: '0.83 ga', status: 'pending' },
  { id: '38', category: 'residential', use: 'Turar joy binosi', area: '0.57 ga', status: 'pending' },
  { id: '39', category: 'residential', use: 'Turar joy binosi', area: '0.41 ga', status: 'pending' },
  { id: '40', category: 'residential', use: 'Turar joy binosi', area: '0.58 ga', status: 'pending' },
  { id: '41', category: 'residential', use: 'Turar joy binosi', area: '0.36 ga', status: 'pending' },
  { id: '42', category: 'residential', use: 'Turar joy binosi', area: '0.63 ga', status: 'pending' },
  { id: '43', category: 'residential', use: 'Turar joy binosi', area: '0.63 ga', status: 'pending' },
  { id: '44', category: 'residential', use: 'Turar joy binosi', area: '0.81 ga', status: 'pending' },
  { id: '45', category: 'residential', use: 'Turar joy binosi', area: '0.62 ga', status: 'pending' },
  { id: '46', category: 'residential', use: 'Turar joy binosi', area: '0.64 ga', status: 'pending' },
  { id: '47', category: 'residential', use: 'Turar joy binosi', area: '0.46 ga', status: 'pending' },
  { id: '48', category: 'residential', use: 'Turar joy binosi', area: '1.21 ga', status: 'pending' },
  { id: '49', category: 'residential', use: 'Turar joy binosi', area: '0.46 ga', status: 'pending' },
  { id: '50', category: 'residential', use: 'Turar joy binosi', area: '0.53 ga', status: 'pending' },
  { id: '51', category: 'residential', use: 'Turar joy binosi', area: '0.76 ga', status: 'pending' },
  { id: '52', category: 'residential', use: 'Turar joy binosi', area: '0.58 ga', status: 'pending' },
  { id: '53', category: 'residential', use: 'Turar joy binosi', area: '0.31 ga', status: 'pending' },
  { id: '54', category: 'residential', use: 'Turar joy binosi', area: '0.59 ga', status: 'pending' },
  { id: '55', category: 'residential', use: 'Turar joy binosi', area: '0.35 ga', status: 'pending' },
  { id: '56', category: 'residential', use: 'Turar joy binosi', area: '1.55 ga', status: 'pending' },
  { id: '57', category: 'residential', use: 'Turar joy binosi', area: '0.64 ga', status: 'pending' },
  { id: '58', category: 'residential', use: 'Turar joy binosi', area: '0.6 ga', status: 'pending' },
  { id: '59', category: 'residential', use: 'Turar joy binosi', area: '0.84 ga', status: 'pending' },
  { id: '60', category: 'residential', use: 'Turar joy binosi', area: '0.76 ga', status: 'pending' },
  { id: '61', category: 'residential', use: 'Turar joy binosi', area: '1.3 ga', status: 'pending' },
  // ── Noturar binolari (commercial) — lots 1-16 ──
  { id: '1', category: 'commercial', use: 'Noturar bino', area: '0.98 ga', status: 'pending' },
  { id: '2', category: 'commercial', use: 'Noturar bino', area: '1.56 ga', status: 'pending' },
  { id: '3', category: 'commercial', use: 'Noturar bino', area: '1.61 ga', status: 'pending' },
  { id: '4', category: 'commercial', use: 'Noturar bino', area: '0.725 ga', status: 'pending' },
  { id: '5', category: 'commercial', use: 'Noturar bino', area: '0.26 ga', status: 'pending' },
  { id: '6', category: 'commercial', use: 'Noturar bino', area: '0.31 ga', status: 'pending' },
  { id: '7', category: 'commercial', use: 'Noturar bino', area: '0.25 ga', status: 'pending' },
  { id: '8', category: 'commercial', use: 'Noturar bino', area: '0.235 ga', status: 'pending' },
  { id: '9', category: 'commercial', use: 'Noturar bino', area: '0.41 ga', status: 'pending' },
  { id: '10', category: 'commercial', use: 'Noturar bino', area: '0.218 ga', status: 'pending' },
  { id: '11', category: 'commercial', use: 'Noturar bino', area: '0.976 ga', status: 'pending' },
  { id: '12', category: 'commercial', use: 'Noturar bino', area: '3.117 ga', status: 'pending' },
  { id: '13', category: 'commercial', use: 'Noturar bino', area: '2.52 ga', status: 'pending' },
  { id: '14', category: 'commercial', use: 'Noturar bino', area: '1.65 ga', status: 'pending' },
  { id: '15', category: 'commercial', use: 'Noturar bino', area: '2.11 ga', status: 'pending' },
  { id: '16', category: 'commercial', use: 'Noturar bino', area: '0.41 ga', status: 'pending' },
];

export const YANGI_LOTS: Lot[] = LOTS_META.map((m) => ({
  ...m,
  points: coords[lotKey(m)] ?? [],
}));
