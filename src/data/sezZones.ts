import coordsJson from './sezZones.coords.json';

export type SezZoneId =
  | 'metallurgy'
  | 'pharma'
  | 'machinery'
  | 'building'
  | 'logistics'
  | 'food'
  | 'energy'
  | 'textile';

export interface SezZone {
  id: SezZoneId;
  name: string;
  color: string;
  points: [number, number][];
}

const META: Record<SezZoneId, { name: string; color: string }> = {
  metallurgy: { name: 'Металлургия',           color: '#5F5E5A' },
  pharma:     { name: 'Фармацевтика',           color: '#1D9E75' },
  machinery:  { name: 'Машиностроение',         color: '#534AB7' },
  building:   { name: 'Стройматериалы',         color: '#BA7517' },
  logistics:  { name: 'Логистика и склады',     color: '#185FA5' },
  food:       { name: 'Пищевая промышленность', color: '#639922' },
  energy:     { name: 'Энергетика',             color: '#EF9F27' },
  textile:    { name: 'Текстиль',               color: '#D4537E' },
};

const coords = coordsJson as unknown as Record<string, [number, number][]>;

export const SEZ_ZONES: SezZone[] = (Object.keys(META) as SezZoneId[]).map((id) => ({
  id,
  name: META[id].name,
  color: META[id].color,
  points: (coords[id] ?? []) as [number, number][],
}));
