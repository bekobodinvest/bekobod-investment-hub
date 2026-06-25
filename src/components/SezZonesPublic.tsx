'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SEZ_ZONES, type SezZoneId } from '@/data/sezZones';
import { SEZ_LOTS, SEZ_LOTS_TOTAL_GA } from '@/data/sezLots';
import { SEZ_OBJECTS, SEZ_RAILWAY } from '@/data/sezObjects';
import { useLanguage } from '@/context/LanguageContext';

const IMAGE = '/sez_aerial.png';

interface SezZonesPublicProps {
  /** Controlled hovered zone (e.g. when a sector card is hovered). */
  hoveredZone?: SezZoneId | null;
  /** Notify parent when the hovered zone changes from the map. */
  onHover?: (id: SezZoneId | null) => void;
}

export default function SezZonesPublic({ hoveredZone, onHover }: SezZonesPublicProps = {}) {
  const { t } = useLanguage();
  const router = useRouter();
  const [internalHover, setInternalHover] = useState<SezZoneId | null>(null);
  const hovered = hoveredZone !== undefined ? hoveredZone : internalHover;
  const setHovered = (id: SezZoneId | null) => {
    setInternalHover(id);
    onHover?.(id);
  };
  const [hoveredObj, setHoveredObj] = useState<string | null>(null);
  const [railTip, setRailTip] = useState<{ x: number; y: number } | null>(null);
  const sectorNames = t.sez.sectors.items.map((it) => it.name);
  const lotsLabel = t.sez.clustersMap.lotsLabel;
  const totalLabel = t.sez.clustersMap.totalLabel;
  const areaUnit = t.sez.clustersMap.areaUnit;
  const open = (id: SezZoneId) => router.push(`/sez/cluster/${id}`);

  // Drag-to-position editor for infrastructure objects, enabled via ?edit=1.
  const [editMode, setEditMode] = useState(false);
  const [objPos, setObjPos] = useState<Record<string, [number, number]>>(
    () => Object.fromEntries(SEZ_OBJECTS.map((o) => [o.id, o.point]))
  );
  const [railPts, setRailPts] = useState<[number, number][]>(() => SEZ_RAILWAY.map((p) => [...p] as [number, number]));
  const dragId = useRef<string | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setEditMode(new URLSearchParams(window.location.search).get('edit') === '1');
  }, []);

  const onMapPointerMove = (e: React.PointerEvent) => {
    if (!dragId.current || !mapRef.current) return;
    const r = mapRef.current.getBoundingClientRect();
    const x = +Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)).toFixed(2);
    const y = +Math.max(0, Math.min(100, ((e.clientY - r.top) / r.height) * 100)).toFixed(2);
    const id = dragId.current;
    if (id.startsWith('rail-')) {
      const idx = +id.slice(5);
      setRailPts((pts) => pts.map((pt, i) => (i === idx ? [x, y] : pt)));
    } else {
      setObjPos((p) => ({ ...p, [id]: [x, y] }));
    }
  };
  const endDrag = () => { dragId.current = null; };
  const railPoints = railPts.map((p) => p.join(',')).join(' ');

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
    <div className="space-y-5">
      {/* Summary total above the map */}
      <div className="inline-flex items-baseline gap-2 px-4 py-2 rounded-lg bg-[#1a2744] text-white">
        <span className="text-xs text-gray-300 mr-1">{totalLabel}</span>
        <span className="font-bold text-lg">{SEZ_LOTS.length} {lotsLabel}</span>
        <span className="text-xs text-gray-300">·</span>
        <span className="text-sm text-gray-200">{SEZ_LOTS_TOTAL_GA.toFixed(1)} {areaUnit}</span>
      </div>

      {/* Aerial + zone overlay — image defines layout, SVG sits on top of identical pixels */}
      <div
        ref={mapRef}
        className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-[#1a2744]"
        onPointerMove={editMode ? onMapPointerMove : undefined}
        onPointerUp={editMode ? endDrag : undefined}
        onPointerLeave={editMode ? endDrag : undefined}
      >
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

          {/* Railway line: dark base + white cross-ties dashes */}
          <polyline
            points={railPoints}
            fill="none"
            stroke="#1a2744"
            strokeWidth={4}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <polyline
            points={railPoints}
            fill="none"
            stroke="#ffffff"
            strokeWidth={4}
            strokeDasharray="2 4"
            strokeLinecap="butt"
            vectorEffect="non-scaling-stroke"
          />
          {/* Wide transparent hit area for hover */}
          <polyline
            points={railPoints}
            fill="none"
            stroke="transparent"
            strokeWidth={16}
            vectorEffect="non-scaling-stroke"
            style={{ cursor: 'pointer', pointerEvents: 'stroke' }}
            onPointerMove={(e) => {
              if (!mapRef.current) return;
              const r = mapRef.current.getBoundingClientRect();
              setRailTip({
                x: ((e.clientX - r.left) / r.width) * 100,
                y: ((e.clientY - r.top) / r.height) * 100,
              });
            }}
            onPointerLeave={() => setRailTip(null)}
          />
        </svg>

        {/* Infrastructure objects — icon markers with hover tooltip */}
        {SEZ_OBJECTS.map((o) => {
          const [x, y] = objPos[o.id] ?? o.point;
          return (
            <button
              key={o.id}
              type="button"
              onPointerDown={editMode ? (e) => { e.preventDefault(); dragId.current = o.id; } : undefined}
              onPointerEnter={() => setHoveredObj(o.id)}
              onPointerLeave={() => setHoveredObj(null)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-lg text-base pointer-events-auto ${
                editMode ? 'cursor-move touch-none ring-2 ring-red-500' : 'ring-2 ring-[#1a2744]'
              }`}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {o.icon}
            </button>
          );
        })}

        {/* Railway edit handles — drag in ?edit=1 */}
        {editMode && railPts.map((p, i) => (
          <button
            key={`rail-${i}`}
            type="button"
            onPointerDown={(e) => { e.preventDefault(); dragId.current = `rail-${i}`; }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white ring-2 ring-amber-500 cursor-move touch-none pointer-events-auto z-20"
            style={{ left: `${p[0]}%`, top: `${p[1]}%` }}
          />
        ))}

        {/* Railway hover — locomotive photo */}
        {railTip && !editMode && (
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-full pointer-events-none"
            style={{ left: `${railTip.x}%`, top: `calc(${railTip.y}% - 0.75rem)` }}
          >
            <div className="rounded-xl overflow-hidden shadow-2xl bg-[#1a2744] w-56 ring-1 ring-white/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/railway-locomotive.jpg" alt={t.sez.clustersMap.railwayLabel} className="block w-full h-32 object-cover" />
              <div className="px-3 py-2 text-white text-xs font-semibold">{t.sez.clustersMap.railwayLabel}</div>
            </div>
          </div>
        )}

        {/* Object hover tooltip */}
        {hoveredObj && (() => {
          const o = SEZ_OBJECTS.find((x) => x.id === hoveredObj);
          if (!o) return null;
          const label = t.sez.objects[o.type];
          const [x, y] = objPos[o.id] ?? o.point;
          return (
            <div
              className="absolute z-10 -translate-x-1/2 -translate-y-full mb-2 px-3 py-2 rounded-lg bg-[#1a2744]/95 text-white shadow-xl backdrop-blur-sm pointer-events-none whitespace-nowrap"
              style={{ left: `${x}%`, top: `calc(${y}% - 1.5rem)` }}
            >
              <div className="text-sm font-bold">{label.name}</div>
              <div className="text-xs text-gray-300 mt-0.5">{label.capacity}</div>
            </div>
          );
        })()}

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
                {m.count} {lotsLabel} · {m.ga.toFixed(1)} {areaUnit}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Coordinate readout — only in ?edit=1 mode */}
      {editMode && (() => {
        const objText = SEZ_OBJECTS.map((o) => {
          const [x, y] = objPos[o.id] ?? o.point;
          return `${o.id}: [${x}, ${y}]`;
        }).join('\n');
        const railText = `railway: [${railPts.map((p) => `[${p[0]}, ${p[1]}]`).join(', ')}]`;
        const coordText = `${objText}\n${railText}`;
        return (
          <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm">
            <div className="flex items-center justify-between gap-3 mb-2">
              <p className="font-semibold text-red-700">Перетащите маркеры, затем нажмите «Скопировать» и пришлите мне:</p>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(coordText)}
                className="shrink-0 px-3 py-1.5 rounded-md bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
              >
                Скопировать координаты
              </button>
            </div>
            <pre className="text-xs bg-white rounded p-3 overflow-x-auto">{coordText}</pre>
          </div>
        );
      })()}
    </div>
  );
}
