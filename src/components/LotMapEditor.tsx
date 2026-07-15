'use client';

import { useMemo, useRef, useState, useCallback } from 'react';
import {
  YANGI_LOTS,
  LOT_STATUS_COLOR,
  lotKey,
  type Lot,
} from '@/data/yangiLots';

type Pt = [number, number];
type Coords = Record<string, Pt[]>;

const IMAGE = '/yangi_aerial.png';
const round = (n: number) => Math.round(n * 100) / 100;
const clamp = (n: number) => Math.max(0, Math.min(100, n));

// label for the lots list
const lotTitle = (l: Lot) =>
  `${l.category === 'residential' ? 'Turar' : 'Noturar'} № ${l.id}`;

export default function LotMapEditor() {
  const boxRef = useRef<HTMLDivElement>(null);
  const initial = useMemo<Coords>(() => {
    const c: Coords = {};
    for (const l of YANGI_LOTS) c[lotKey(l)] = l.points.map((p) => [...p] as Pt);
    return c;
  }, []);

  const [coords, setCoords] = useState<Coords>(initial);
  const [selected, setSelected] = useState<string>(lotKey(YANGI_LOTS[0]));
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'ok' | 'err'>(
    'idle'
  );

  // Global transform — move/scale ALL lots at once to refit them onto a new background.
  const [gScale, setGScale] = useState(1);
  const [gDx, setGDx] = useState(0);
  const [gDy, setGDy] = useState(0);
  const isTransforming = gScale !== 1 || gDx !== 0 || gDy !== 0;

  const pivot = useMemo<Pt>(() => {
    let sx = 0, sy = 0, n = 0;
    for (const pts of Object.values(coords)) for (const [x, y] of pts) { sx += x; sy += y; n++; }
    return n ? [sx / n, sy / n] : [50, 50];
  }, [coords]);

  const tx = useCallback(
    ([x, y]: Pt): Pt => [
      clamp(round(pivot[0] + (x - pivot[0]) * gScale + gDx)),
      clamp(round(pivot[1] + (y - pivot[1]) * gScale + gDy)),
    ],
    [pivot, gScale, gDx, gDy]
  );

  const resetTransform = useCallback(() => { setGScale(1); setGDx(0); setGDy(0); }, []);

  const applyTransform = useCallback(() => {
    setCoords((prev) => {
      const next: Coords = {};
      for (const [k, pts] of Object.entries(prev)) next[k] = pts.map(tx);
      return next;
    });
    resetTransform();
  }, [tx, resetTransform]);

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

  // Insert a vertex on the edge nearest to the click point.
  const addVertexNear = useCallback(
    (key: string, p: Pt) => {
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
    },
    []
  );

  const deleteVertex = useCallback((key: string, idx: number) => {
    setCoords((prev) => {
      if (prev[key].length <= 3) return prev; // keep a triangle minimum
      const pts = prev[key].slice();
      pts.splice(idx, 1);
      return { ...prev, [key]: pts };
    });
  }, []);

  const resetLot = useCallback(
    (key: string) => setCoords((prev) => ({ ...prev, [key]: initial[key].map((p) => [...p] as Pt) })),
    [initial]
  );

  const save = useCallback(async () => {
    setSaveState('saving');
    try {
      const res = await fetch('/api/lots', {
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

  const selectedPts = coords[selected] ?? [];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <aside className="lg:w-72 shrink-0 space-y-4">
        <div className="rounded-xl border border-gray-200 p-4 bg-white">
          <div className="text-sm font-bold text-[#1a2744] mb-1">
            {YANGI_LOTS.find((l) => lotKey(l) === selected)
              ? lotTitle(YANGI_LOTS.find((l) => lotKey(l) === selected)!)
              : '—'}
          </div>
          <div className="text-xs text-gray-400 mb-3">
            {selectedPts.length} vertices · drag points or the shape
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => resetLot(selected)}
              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              Reset lot
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(
                  JSON.stringify(coords[selected])
                );
              }}
              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              Copy points
            </button>
          </div>
          <p className="text-[11px] text-gray-400 mt-3 leading-relaxed text-justify">
            Double-click a lot to add a point on the nearest edge. Shift-click (or
            right-click) a point to delete it.
          </p>
        </div>

        {/* Global transform — refit all lots onto a new background */}
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 space-y-3">
          <div className="text-sm font-bold text-amber-800">Двигать ВСЕ лоты</div>
          <label className="block text-xs text-amber-900">
            Масштаб: {gScale.toFixed(2)}×
            <input type="range" min={0.5} max={1.8} step={0.01} value={gScale}
              onChange={(e) => setGScale(+e.target.value)} className="w-full" />
          </label>
          <label className="block text-xs text-amber-900">
            Сдвиг X: {gDx.toFixed(1)}
            <input type="range" min={-40} max={40} step={0.5} value={gDx}
              onChange={(e) => setGDx(+e.target.value)} className="w-full" />
          </label>
          <label className="block text-xs text-amber-900">
            Сдвиг Y: {gDy.toFixed(1)}
            <input type="range" min={-40} max={40} step={0.5} value={gDy}
              onChange={(e) => setGDy(+e.target.value)} className="w-full" />
          </label>
          <div className="flex gap-2">
            <button onClick={applyTransform} disabled={!isTransforming}
              className="flex-1 text-xs px-3 py-1.5 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 disabled:opacity-50">
              Применить
            </button>
            <button onClick={resetTransform} disabled={!isTransforming}
              className="text-xs px-3 py-1.5 rounded-lg border border-amber-300 text-amber-800 hover:bg-amber-100 disabled:opacity-50">
              Сброс
            </button>
          </div>
          <p className="text-[11px] text-amber-700 leading-relaxed text-justify">
            Подгоните все лоты ползунками, нажмите «Применить» — затем правьте отдельные лоты как обычно.
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
            ? '✓ Saved'
            : saveState === 'err'
            ? '✕ Error'
            : 'Save all perimeters'}
        </button>

        <div className="rounded-xl border border-gray-200 bg-white max-h-72 overflow-auto">
          {YANGI_LOTS.map((l) => {
            const k = lotKey(l);
            return (
              <button
                key={k}
                onClick={() => setSelected(k)}
                className={`block w-full text-left px-3 py-1.5 text-xs border-b border-gray-100 ${
                  selected === k
                    ? 'bg-[#e8f5e9] text-[#1a2744] font-semibold'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {lotTitle(l)} · {l.area}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Canvas */}
      <div
        ref={boxRef}
        className="relative w-full lg:self-start overflow-hidden rounded-2xl shadow-2xl bg-[#1a2744] select-none touch-none"
        onPointerMove={onMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        {/* Image defines the box (no object-cover crop), so the capture box
            matches the display page exactly — coords stay pixel-aligned. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMAGE}
          alt="Yangi O'zbekiston aerial"
          width={2316}
          height={1289}
          className="block w-full h-auto pointer-events-none"
          draggable={false}
        />

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {YANGI_LOTS.map((l) => {
            const k = lotKey(l);
            const base = coords[k];
            if (!base?.length) return null;
            const pts = isTransforming ? base.map(tx) : base;
            const color = LOT_STATUS_COLOR[l.status];
            const isSel = k === selected;
            return (
              <polygon
                key={k}
                points={pts.map((p) => p.join(',')).join(' ')}
                fill={color}
                fillOpacity={isSel ? 0.4 : 0.18}
                stroke={isSel ? '#ffffff' : color}
                strokeWidth={isSel ? 0.5 : 0.3}
                vectorEffect="non-scaling-stroke"
                style={{ cursor: isTransforming ? 'default' : isSel ? 'move' : 'pointer' }}
                onPointerDown={(e) => {
                  if (isTransforming) return;
                  if (!isSel) {
                    setSelected(k);
                    return;
                  }
                  e.preventDefault();
                  drag.current = {
                    type: 'body',
                    key: k,
                    start: pct(e),
                    startPts: base.map((p) => [...p] as Pt),
                  };
                }}
                onDoubleClick={(e) => {
                  if (isTransforming) return;
                  e.preventDefault();
                  addVertexNear(k, pct(e));
                }}
              />
            );
          })}

          {/* Vertex handles for the selected lot (hidden while transforming all) */}
          {!isTransforming && selectedPts.map((p, i) => (
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
