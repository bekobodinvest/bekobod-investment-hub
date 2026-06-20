'use client';

import { useMemo, useRef, useState, useCallback } from 'react';
import { SEZ_LOTS, SEZ_LOTS_TOTAL_GA, type SezLot } from '@/data/sezLots';
import { SEZ_ZONES, type SezZoneId } from '@/data/sezZones';

type Pt = [number, number];
type LotEntry = { zone: SezZoneId; points: Pt[] };
type Data = Record<string, LotEntry>;

const IMAGE = '/sez_aerial.png';
const round = (n: number) => Math.round(n * 100) / 100;
const clamp = (n: number) => Math.max(0, Math.min(100, n));

export default function SezLotEditor() {
  const boxRef = useRef<HTMLDivElement>(null);

  const initial = useMemo<Data>(() => {
    const d: Data = {};
    for (const l of SEZ_LOTS) {
      d[l.id] = { zone: l.zone, points: l.points.map((p) => [...p] as Pt) };
    }
    return d;
  }, []);

  const [data, setData] = useState<Data>(initial);
  const [selected, setSelected] = useState<string>(SEZ_LOTS[0].id);
  const [zoneFilter, setZoneFilter] = useState<SezZoneId | 'all'>('all');
  const [search, setSearch] = useState('');
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'ok' | 'err'>('idle');
  const [aspect, setAspect] = useState<string>('2000 / 1450');
  const [showZones, setShowZones] = useState(false);

  const drag = useRef<
    | { type: 'vertex'; key: string; idx: number }
    | { type: 'body'; key: string; start: Pt; startPts: Pt[] }
    | null
  >(null);

  const pct = useCallback((e: { clientX: number; clientY: number }): Pt => {
    const r = boxRef.current!.getBoundingClientRect();
    return [
      clamp(round(((e.clientX - r.left) / r.width) * 100)),
      clamp(round(((e.clientY - r.top) / r.height) * 100)),
    ];
  }, []);

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      const d = drag.current;
      if (!d) return;
      const [mx, my] = pct(e);
      setData((prev) => {
        const next = { ...prev };
        const entry = prev[d.key];
        if (d.type === 'vertex') {
          const pts = entry.points.slice();
          pts[d.idx] = [mx, my];
          next[d.key] = { ...entry, points: pts };
        } else {
          const dx = mx - d.start[0];
          const dy = my - d.start[1];
          next[d.key] = {
            ...entry,
            points: d.startPts.map(
              ([x, y]) => [clamp(round(x + dx)), clamp(round(y + dy))] as Pt
            ),
          };
        }
        return next;
      });
    },
    [pct]
  );

  const endDrag = useCallback(() => {
    drag.current = null;
  }, []);

  const addVertexNear = useCallback((key: string, p: Pt) => {
    setData((prev) => {
      const entry = prev[key];
      const pts = entry.points;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        const b = pts[(i + 1) % pts.length];
        const mx = (a[0] + b[0]) / 2;
        const my = (a[1] + b[1]) / 2;
        const dist = (mx - p[0]) ** 2 + (my - p[1]) ** 2;
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      }
      const copy = pts.slice();
      copy.splice(best + 1, 0, p);
      return { ...prev, [key]: { ...entry, points: copy } };
    });
  }, []);

  const deleteVertex = useCallback((key: string, idx: number) => {
    setData((prev) => {
      const entry = prev[key];
      if (entry.points.length <= 3) return prev;
      const pts = entry.points.slice();
      pts.splice(idx, 1);
      return { ...prev, [key]: { ...entry, points: pts } };
    });
  }, []);

  const setLotZone = useCallback((key: string, zone: SezZoneId) => {
    setData((prev) => ({ ...prev, [key]: { ...prev[key], zone } }));
  }, []);

  const resetLot = useCallback(
    (key: string) =>
      setData((prev) => ({
        ...prev,
        [key]: {
          zone: initial[key].zone,
          points: initial[key].points.map((p) => [...p] as Pt),
        },
      })),
    [initial]
  );

  const save = useCallback(async () => {
    setSaveState('saving');
    try {
      const res = await fetch('/api/sez-lots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      setSaveState(res.ok ? 'ok' : 'err');
    } catch {
      setSaveState('err');
    }
    setTimeout(() => setSaveState('idle'), 2500);
  }, [data]);

  const zoneColor = useCallback(
    (zone: SezZoneId) =>
      SEZ_ZONES.find((z) => z.id === zone)?.color ?? '#888',
    []
  );

  const lotMeta = useCallback(
    (id: string): SezLot => SEZ_LOTS.find((l) => l.id === id)!,
    []
  );

  const filteredLots = useMemo(() => {
    const q = search.trim().toLowerCase();
    return SEZ_LOTS.filter((l) => {
      if (zoneFilter !== 'all' && data[l.id].zone !== zoneFilter) return false;
      if (q && !l.id.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [data, zoneFilter, search]);

  // Aggregate areas per zone
  const perZone = useMemo(() => {
    const m: Record<string, { count: number; ga: number }> = {};
    for (const z of SEZ_ZONES) m[z.id] = { count: 0, ga: 0 };
    for (const l of SEZ_LOTS) {
      const z = data[l.id].zone;
      m[z].count++;
      m[z].ga += l.areaGa;
    }
    return m;
  }, [data]);

  const selectedEntry = data[selected];
  const selectedLot = lotMeta(selected);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <aside className="lg:w-80 shrink-0 space-y-4">
        {/* Selected lot card */}
        <div className="rounded-xl border border-gray-200 p-4 bg-white">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="inline-block w-3 h-3 rounded-sm shrink-0"
              style={{ background: zoneColor(selectedEntry.zone) }}
            />
            <div className="text-sm font-bold text-[#1a2744]">{selectedLot.id}</div>
            <div className="text-xs text-gray-400 ml-auto">{selectedLot.area}</div>
          </div>
          <label className="block text-[11px] text-gray-500 mb-1">Кластер</label>
          <select
            value={selectedEntry.zone}
            onChange={(e) => setLotZone(selected, e.target.value as SezZoneId)}
            className="w-full text-xs px-2 py-1.5 rounded-lg border border-gray-200 mb-3"
          >
            {SEZ_ZONES.map((z) => (
              <option key={z.id} value={z.id}>
                {z.name}
              </option>
            ))}
          </select>
          <div className="text-xs text-gray-400 mb-2">
            {selectedEntry.points.length} нуқта
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => resetLot(selected)}
              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              Reset lot
            </button>
            <button
              onClick={() =>
                navigator.clipboard?.writeText(JSON.stringify(selectedEntry))
              }
              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              Copy
            </button>
          </div>
        </div>

        <button
          onClick={save}
          disabled={saveState === 'saving'}
          className="w-full rounded-xl bg-[#4a9c4e] hover:bg-[#3d8540] text-white font-semibold py-3 transition-colors disabled:opacity-60"
        >
          {saveState === 'saving'
            ? 'Saving…'
            : saveState === 'ok'
            ? '✓ Saqlandi'
            : saveState === 'err'
            ? '✕ Хатолик'
            : '120 лотни сақлаш'}
        </button>

        {/* Toggle: big cluster overlays */}
        <label className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={showZones}
            onChange={(e) => setShowZones(e.target.checked)}
            className="accent-[#4a9c4e]"
          />
          8 та катта кластерни кўрсатиш
        </label>

        {/* Per-zone tallies */}
        <div className="rounded-xl border border-gray-200 bg-white p-2">
          <button
            onClick={() => setZoneFilter('all')}
            className={`w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-md ${
              zoneFilter === 'all' ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'
            }`}
          >
            <span className="text-gray-700">Барча</span>
            <span className="ml-auto text-gray-500">
              {SEZ_LOTS.length} · {SEZ_LOTS_TOTAL_GA.toFixed(1)} GA
            </span>
          </button>
          {SEZ_ZONES.map((z, i) => {
            const m = perZone[z.id];
            return (
              <button
                key={z.id}
                onClick={() => setZoneFilter(z.id)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-md ${
                  zoneFilter === z.id ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'
                }`}
              >
                <span
                  className="inline-flex items-center justify-center w-5 h-5 rounded-md text-white text-[10px] font-bold shrink-0"
                  style={{ background: z.color }}
                >
                  {i + 1}
                </span>
                <span className="truncate text-gray-700">{z.name}</span>
                <span className="ml-auto text-gray-500 whitespace-nowrap">
                  {m.count} · {m.ga.toFixed(1)} GA
                </span>
              </button>
            );
          })}
        </div>

        {/* Search + lot list */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Қидириш: LOT5…"
          className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200"
        />
        <div className="rounded-xl border border-gray-200 bg-white max-h-96 overflow-auto">
          {filteredLots.map((l) => {
            const entry = data[l.id];
            return (
              <button
                key={l.id}
                onClick={() => setSelected(l.id)}
                className={`w-full text-left px-3 py-1.5 text-xs border-b border-gray-100 flex items-center gap-2 ${
                  selected === l.id
                    ? 'bg-[#e8f5e9] text-[#1a2744] font-semibold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span
                  className="inline-block w-2.5 h-2.5 rounded-sm shrink-0"
                  style={{ background: zoneColor(entry.zone) }}
                />
                <span>{l.id}</span>
                <span className="ml-auto text-gray-400">{l.area}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Canvas */}
      <div
        ref={boxRef}
        className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-[#1a2744] select-none touch-none"
        style={{ aspectRatio: aspect }}
        onPointerMove={onMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMAGE}
          alt="Bekobod SEZ"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
          onLoad={(e) => {
            const img = e.currentTarget;
            if (img.naturalWidth && img.naturalHeight) {
              setAspect(`${img.naturalWidth} / ${img.naturalHeight}`);
            }
          }}
        />

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Background: parent zone outlines + numbered labels (toggle) */}
          {showZones && SEZ_ZONES.map((z, i) => {
            if (!z.points.length) return null;
            let cx = 0, cy = 0;
            for (const [x, y] of z.points) { cx += x; cy += y; }
            cx /= z.points.length; cy /= z.points.length;
            return (
              <g key={'z-' + z.id} pointerEvents="none">
                <polygon
                  points={z.points.map((p) => p.join(',')).join(' ')}
                  fill={z.color}
                  fillOpacity={0.1}
                  stroke={z.color}
                  strokeOpacity={0.5}
                  strokeWidth={0.3}
                  vectorEffect="non-scaling-stroke"
                />
                <circle cx={cx} cy={cy} r={2.2} fill={z.color} stroke="white" strokeWidth={0.4} vectorEffect="non-scaling-stroke" />
                <text x={cx} y={cy + 0.9} textAnchor="middle" fill="white" fontSize={2.6} fontWeight={700} fontFamily="sans-serif">
                  {i + 1}
                </text>
              </g>
            );
          })}

          {/* All 120 lots */}
          {SEZ_LOTS.map((l) => {
            const entry = data[l.id];
            if (!entry.points.length) return null;
            const color = zoneColor(entry.zone);
            const isSel = l.id === selected;
            const dim =
              zoneFilter !== 'all' && entry.zone !== zoneFilter && !isSel;
            return (
              <polygon
                key={l.id}
                points={entry.points.map((p) => p.join(',')).join(' ')}
                fill={color}
                fillOpacity={isSel ? 0.7 : dim ? 0.1 : 0.45}
                stroke={isSel ? '#ffffff' : color}
                strokeWidth={isSel ? 0.6 : 0.25}
                vectorEffect="non-scaling-stroke"
                style={{ cursor: isSel ? 'move' : 'pointer' }}
                onPointerDown={(e) => {
                  if (!isSel) {
                    setSelected(l.id);
                    return;
                  }
                  e.preventDefault();
                  drag.current = {
                    type: 'body',
                    key: l.id,
                    start: pct(e),
                    startPts: entry.points.map((p) => [...p] as Pt),
                  };
                }}
                onDoubleClick={(e) => {
                  e.preventDefault();
                  addVertexNear(l.id, pct(e));
                }}
              />
            );
          })}

          {/* Vertex handles for selected lot */}
          {selectedEntry.points.map((p, i) => (
            <circle
              key={i}
              cx={p[0]}
              cy={p[1]}
              r={0.7}
              fill="#ffffff"
              stroke="#1a2744"
              strokeWidth={0.3}
              vectorEffect="non-scaling-stroke"
              style={{ cursor: 'grab' }}
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.shiftKey || e.button === 2) {
                  deleteVertex(selected, i);
                  return;
                }
                drag.current = { type: 'vertex', key: selected, idx: i };
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                deleteVertex(selected, i);
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
