// Infrastructure objects placed on the SEZ aerial map.
// `point` is [x, y] in the same 0–100 coordinate space as the zone polygons.
// NOTE: positions are approximate placeholders — to be refined later.

export type SezObjectType = 'substation' | 'reservoir';

export interface SezObject {
  id: string;
  type: SezObjectType;
  icon: string;
  point: [number, number];
}

export const SEZ_OBJECTS: SezObject[] = [
  { id: 'substation-1', type: 'substation', icon: '⚡', point: [38.08, 52.11] },
  { id: 'reservoir-1', type: 'reservoir', icon: '💧', point: [26.01, 17.46] },
  { id: 'reservoir-2', type: 'reservoir', icon: '💧', point: [39.62, 46.67] },
];
