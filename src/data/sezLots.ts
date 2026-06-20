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

// LOT1..LOT120 areas in GA — straight from the LOTLAR TASNIFI table.
const AREAS: number[] = [
  1.52, 1.51, 1.66, 1.71, 2.23, 1.18, 1.3,  1.36, 1.33, 1.3,
  1.48, 1.21, 1.22, 0.58, 0.77, 1.71, 1.72, 1.64, 1.71, 1.72,
  1.72, 1.58, 1.2,  0.84, 1.43, 1.37, 1.44, 1.98, 1.2,  1.2,
  1.77, 1.76, 1.37, 1.53, 1.54, 1.37, 1.7,  1.35, 1.65, 1.65,
  1.66, 1.62, 0.74, 1.58, 1.8,  1.57, 1.58, 1.58, 1.58, 1.78,
  2.21, 1.58, 1.58, 1.57, 1.54, 2.33, 1.31, 1.54, 1.18, 0.74,
  1.55, 2.3,  1.63, 2.25, 1.2,  2,    1.86, 1.53, 1.53, 2.29,
  1.53, 1.53, 3.16, 1.98, 2.51, 2.23, 1.42, 1.23, 0.99, 0.67,
  1.46, 1.68, 0.57, 2.57, 1.78, 1.43, 1,    1.75, 1.08, 2.29,
  1.86, 1.25, 1.51, 1.2,  1.56, 2,    1.19, 1.33, 1.93, 1.24,
  1.24, 1.25, 1.15, 1.9,  1.33, 1.32, 1.5,  1.41, 1.12, 50,
  0.5,  0.49, 0.47, 0.46, 0.42, 0.38, 0.44, 0.38, 0.32, 50,
];

type LotEntry = { zone: SezZoneId; points: [number, number][] };
const data = dataJson as unknown as Record<string, LotEntry>;

export const SEZ_LOTS: SezLot[] = AREAS.map((areaGa, i) => {
  const id = `LOT${i + 1}`;
  const entry = data[id] ?? { zone: 'metallurgy' as SezZoneId, points: [] };
  return {
    id,
    number: i + 1,
    areaGa,
    area: `${areaGa} GA`,
    zone: entry.zone,
    status: 'pending',
    points: entry.points,
  };
});

export const SEZ_LOTS_TOTAL_GA = AREAS.reduce((s, v) => s + v, 0);
