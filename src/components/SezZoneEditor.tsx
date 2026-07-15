'use client';

import { useMemo, useRef, useState, useCallback } from 'react';
import { SEZ_ZONES, type SezZone } from '@/data/sezZones';

type Pt = [number, number];
type Coords = Record<string, Pt[]>;

const IMAGE = '/sez_aerial.png';
const round = (n: number) => Math.round(n * 100) / 100;
const clamp = (n: number) => Math.max(0, Math.min(100, n));

export default function SezZoneEditor() {
  const boxRef = useRef<HTMLDivElement>(null);

  const initial = useMemo<Coords>(() => {
    const c: Coords = {};
    for (const z of SEZ_ZONES) c[z.id] = z.points.map((p) => [...p] as Pt);
    return c;
  }, []);

  const [coords, setCoords] = useState<Coords>(initial);
  const [selected, setSelected] = useState<string>(SEZ_ZONES[0].id);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'ok' | 'err'>('idle');
  const [aspect, setAspect] = useState<string>('4096 / 2286');

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
      setCoords((prev) => {
        const next = { ...prev };
        if (d.type === 'vertex') {
          const pts = prev[d.key].slice();
          pts[d.idx] = [mx, my];
          next[d.key] = pts;
        } else {
          const dx = mx - d.start[0];
          const dy = my - d.start[1];
          next[d.key] = d.startPts.map(
            ([x, y]) => [clamp(round(x + dx)), clamp(round(y + dy))] as Pt
          );
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
    setCoords((prev) => {
      const pts = prev[key];
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
      return { ...prev, [key]: copy };
    });
  }, []);

  const deleteVertex = useCallback((key: string, idx: number) => {
    setCoords((prev) => {
      if (prev[key].length <= 3) return prev;
      const pts = prev[key].slice();
      pts.splice(idx, 1);
      return { ...prev, [key]: pts };
    });
  }, []);

  const resetZone = useCallback(
    (key: string) =>
      setCoords((prev) => ({ ...prev, [key]: initial[key].map((p) => [...p] as Pt) })),
    [initial]
  );

  const resetAll = useCallback(() => {
    const fresh: Coords = {};
    for (const k of Object.keys(initial)) fresh[k] = initial[k].map((p) => [...p] as Pt);
    setCoords(fresh);
  }, [initial]);

  const save = useCallback(async () => {
    setSaveState('saving');
    try {
      const res = await fetch('/api/sez-zones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coords }),
      });
      setSaveState(res.ok ? 'ok' : 'err');
    } catch {
      setSaveState('err');
    }
    setTimeout(() => setSaveState('idle'), 2500);
  }, [coords]);

  const selectedZone: SezZone | undefined = SEZ_ZONES.find((z) => z.id === selected);
  const selectedPts = coords[selected] ?? [];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <aside className="lg:w-72 shrink-0 space-y-4">
        <div className="rounded-xl border border-gray-200 p-4 bg-white">
          <div
            className="text-sm font-bold mb-1"
            style={{ color: selectedZone?.color ?? '#1a2744' }}
          >
            {selectedZone ? selectedZone.name : '—'}
          </div>
          <div className="text-xs text-gray-400 mb-3">
            {selectedPts.length} нуқта · ҳаракатлантириб шакл ўзгартиринг
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => resetZone(selected)}
              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              Reset zone
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(JSON.stringify(coords[selected]));
              }}
              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              Copy points
            </button>
            <button
              onClick={resetAll}
              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              Reset all
            </button>
          </div>
          <p className="text-[11px] text-gray-400 mt-3 leading-relaxed text-justify indent-8">
            Double-click a zone to add a vertex on the nearest edge. Shift-click
            (or right-click) a vertex to delete it. Drag the zone body to move
            it as a whole.
          </p>
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
            : '8 зонани сақлаш'}
        </button>

        <div className="rounded-xl border border-gray-200 bg-white">
          {SEZ_ZONES.map((z) => (
            <button
              key={z.id}
              onClick={() => setSelected(z.id)}
              className={`w-full text-left px-3 py-2 text-xs border-b border-gray-100 flex items-center gap-2 ${
                selected === z.id
                  ? 'bg-gray-50 font-semibold text-[#1a2744]'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span
                className="inline-block w-3 h-3 rounded-sm shrink-0"
                style={{ background: z.color }}
              />
              <span className="truncate">{z.name}</span>
            </button>
          ))}
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
          alt="Bekabad SEZ"
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
          {SEZ_ZONES.map((z) => {
            const pts = coords[z.id];
            if (!pts?.length) return null;
            const isSel = z.id === selected;
            return (
              <g key={z.id}>
                <polygon
                  points={pts.map((p) => p.join(',')).join(' ')}
                  fill={z.color}
                  fillOpacity={isSel ? 0.55 : 0.32}
                  stroke={isSel ? '#ffffff' : z.color}
                  strokeWidth={isSel ? 0.6 : 0.4}
                  vectorEffect="non-scaling-stroke"
                  style={{ cursor: isSel ? 'move' : 'pointer' }}
                  onPointerDown={(e) => {
                    if (!isSel) {
                      setSelected(z.id);
                      return;
                    }
                    e.preventDefault();
                    drag.current = {
                      type: 'body',
                      key: z.id,
                      start: pct(e),
                      startPts: pts.map((p) => [...p] as Pt),
                    };
                  }}
                  onDoubleClick={(e) => {
                    e.preventDefault();
                    addVertexNear(z.id, pct(e));
                  }}
                />
              </g>
            );
          })}

          {/* Vertex handles for the selected zone */}
          {selectedPts.map((p, i) => (
            <circle
              key={i}
              cx={p[0]}
              cy={p[1]}
              r={0.9}
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
