'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SEZ_ZONES, type SezZoneId } from '@/data/sezZones';
import { SEZ_LOTS, SEZ_LOTS_TOTAL_GA } from '@/data/sezLots';
import { useLanguage } from '@/context/LanguageContext';

const IMAGE = '/sez_aerial.png';

export default function SezZonesPublic() {
  const { t } = useLanguage();
  const router = useRouter();
  const [hovered, setHovered] = useState<SezZoneId | null>(null);
  const sectorNames = t.sez.sectors.items.map((it) => it.name);
  const lotsLabel = t.sez.clustersMap.lotsLabel;
  const totalLabel = t.sez.clustersMap.totalLabel;
  const open = (id: SezZoneId) => router.push(`/sez/cluster/${id}`);

  const perZone = useMemo(() => {
    const m: Record<string, { count: number; ga: number }> = {};
    for (const z of SEZ_ZONES) m[z.id] = { count: 0, ga: 0 };
    for (const l of SEZ_LOTS) {
      m[l.zone].count++;
      m[l.zone].ga += l.areaGa;
    }
    return m;
  }, []);

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6">
      {/* Aerial + zone overlay — image defines layout, SVG sits on top of identical pixels */}
      <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-[#1a2744]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMAGE}
          alt="Bekobod SEZ aerial"
          className="block w-full h-auto pointer-events-none"
          draggable={false}
        />
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {SEZ_ZONES.map((z) => {
            if (!z.points.length) return null;
            const isHov = hovered === z.id;
            const dim = hovered && !isHov;
            return (
              <polygon
                key={z.id}
                points={z.points.map((p) => p.join(',')).join(' ')}
                fill={z.color}
                fillOpacity={isHov ? 0.7 : dim ? 0.2 : 0.45}
                stroke={z.color}
                strokeWidth={isHov ? 0.6 : 0.4}
                vectorEffect="non-scaling-stroke"
                style={{ cursor: 'pointer' }}
                onPointerEnter={() => setHovered(z.id)}
                onPointerLeave={() => setHovered(null)}
                onClick={() => open(z.id)}
              />
            );
          })}
        </svg>

        {/* Hover tooltip */}
        {hovered && (() => {
          const idx = SEZ_ZONES.findIndex((x) => x.id === hovered);
          const z = SEZ_ZONES[idx];
          const m = perZone[z.id];
          return (
            <div className="absolute left-4 top-4 bg-[#1a2744]/90 backdrop-blur-sm text-white rounded-lg px-3 py-2 shadow-lg pointer-events-none">
              <div className="text-xs text-gray-300">{idx + 1}</div>
              <div className="text-sm font-bold">{sectorNames[idx] ?? z.name}</div>
              <div className="text-xs text-gray-300 mt-1">
                {m.count} {lotsLabel} · {m.ga.toFixed(1)} GA
              </div>
            </div>
          );
        })()}
      </div>

      {/* Legend */}
      <aside className="space-y-2">
        <div className="px-3 py-2 rounded-lg bg-[#1a2744] text-white">
          <div className="text-xs text-gray-300">{totalLabel}</div>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg">{SEZ_LOTS.length} {lotsLabel}</span>
            <span className="text-xs text-gray-300">·</span>
            <span className="text-sm text-gray-200">{SEZ_LOTS_TOTAL_GA.toFixed(1)} GA</span>
          </div>
        </div>
        {SEZ_ZONES.map((z, i) => {
          const m = perZone[z.id];
          const isHov = hovered === z.id;
          return (
            <button
              key={z.id}
              type="button"
              onPointerEnter={() => setHovered(z.id)}
              onPointerLeave={() => setHovered(null)}
              onClick={() => open(z.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg border text-left transition-colors ${
                isHov ? 'border-gray-300 bg-gray-50' : 'border-gray-100 hover:bg-gray-50'
              }`}
            >
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-md text-white text-xs font-bold shrink-0"
                style={{ background: z.color }}
              >
                {i + 1}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-sm font-semibold text-[#1a2744] truncate">{sectorNames[i] ?? z.name}</span>
                <span className="block text-[11px] text-gray-500">{m.count} {lotsLabel} · {m.ga.toFixed(1)} GA</span>
              </span>
            </button>
          );
        })}
      </aside>
    </div>
  );
}
