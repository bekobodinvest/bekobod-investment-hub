import dataJson from './sezLots.data.json';
import type { SezZoneId } from './sezZones';

export type LotStatus = 'available' | 'pending' | 'sold';

export interface SezLot {
  id: string;
  number: number;
  areaGa: number;
  area: string;
  zone: SezZoneId;
  status: LotStatus;
  points: [number, number][];
}

// LOT1..LOT135 areas in GA.
// LOT1..LOT110 — other clusters, straight from the LOTLAR TASNIFI table.
// LOT111..LOT135 — Metallurgy general plan (25 lots, reference master plan):
//   LOT111 = recreational zone; LOT112..LOT135 = production lots. Total 85.2 GA.
const AREAS: number[] = [
  1.5,  1.78, 1.78, 1.86, 2.64, 1.5,  1.61, 1.62, 1.59, 1.56,
  1.78, 1.42, 1.22, 0.58, 0.79, 1.71, 1.72, 1.82, 1.71, 1.72,
  1.9,  1.58, 1.2,  0.9,  1.58, 1.28, 1.23, 1.57, 1.2,  1.2,
  1.94, 1.93, 1.37, 1.53, 1.54, 1.37, 1.86, 1.35, 1.65, 1.65,
  1.66, 1.65, 0.74, 1.58, 1.8,  1.57, 1.58, 1.58, 1.58, 1.78,
  2.21, 1.58, 1.58, 1.57, 1.54, 2.33, 1.31, 1.54, 1.18, 0.74,
  1.55, 2.3,  1.63, 2.25, 1.2,  2,    1.86, 1.53, 1.53, 2.29,
  1.53, 1.53, 3.16, 1.98, 2.51, 2.23, 1.42, 1.23, 0.99, 0.67,
  1.46, 1.68, 0.57, 2.57, 1.78, 1.43, 1,    1.75, 1.08, 2.29,
  1.86, 1.25, 1.51, 1.2,  1.56, 2,    1.19, 1.33, 1.93, 1.24,
  1.24, 1.25, 1.15, 1.9,  1.33, 1.32, 1.5,  1.41, 1.12, 50,
  5.0,  1.4,  3.6,  3.8,  3.8,  3.8,  3.8,  1.7,  3.3,  2.5,
  3.3,  3.3,  3.3,  3.3,  2.4,  3.3,  8.4,  2.4,  3.4,  2.4,
  3.6,  3.5,  3.5,  3.4,  3.0,
];

type LotEntry = { zone: SezZoneId; points: [number, number][] };
const data = dataJson as unknown as Record<string, LotEntry>;

// Lots already sold (taken off auction). Keyed by lot id.
export const SEZ_SOLD_LOTS = new Set<string>([]);

// Per-lot e-auksion.uz listing. Lots not listed here have no auction page yet.
export const SEZ_AUCTION_URLS: Record<string, string> = {
  LOT6: 'https://e-auksion.uz/lot-view?lot_id=25838554',
  LOT127: 'https://e-auksion.uz/lot-view?lot_id=25746753',
};

export const SEZ_LOTS: SezLot[] = AREAS.map((areaGa, i) => {
  const id = `LOT${i + 1}`;
  const entry = data[id] ?? { zone: 'metallurgy' as SezZoneId, points: [] };
  return {
    id,
    number: i + 1,
    areaGa,
    area: `${areaGa} GA`,
    zone: entry.zone,
    status: SEZ_SOLD_LOTS.has(id) ? 'sold' : SEZ_AUCTION_URLS[id] ? 'available' : 'pending',
    points: entry.points,
  };
});

export const SEZ_LOTS_TOTAL_GA = AREAS.reduce((s, v) => s + v, 0);

// Pricing (USD per hectare), 10-year installment terms.
// Land itself + agricultural-land conversion compensation ("yer nobudgarchiligi").
export const SEZ_LAND_USD_PER_GA = 7742;
export const SEZ_LOSS_USD_PER_GA = 152884;
export const SEZ_INSTALLMENT_YEARS = 10;

export function lotPrice(areaGa: number) {
  const land = Math.round(areaGa * SEZ_LAND_USD_PER_GA);
  const loss = Math.round(areaGa * SEZ_LOSS_USD_PER_GA);
  return { land, loss, total: land + loss };
}

export const usd = (n: number) => '$' + n.toLocaleString('en-US');
