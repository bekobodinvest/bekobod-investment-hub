'use client';

import { useRef, useState, useCallback } from 'react';
import {
  YANGI_LOTS,
  LOT_STATUS_COLOR,
  DEFAULT_AUCTION_URL,
  type Lot,
  type LotCategory,
  type LotStatus,
} from '@/data/yangiLots';

export interface LotMapLabels {
  title: string;
  description: string;
  /** image src under /public, e.g. "/yangi_aerial.png" */
  image: string;
  imageAlt: string;
  lotLabel: string; // "Lot" / "Лот" / "Lot"
  areaLabel: string; // "Area" / "Площадь" / "Maydoni"
  priceLabel: string; // "Starting price" / "Стартовая цена" / "Boshlang'ich narx"
  auctionButton: string; // "Bid on auction" / "На аукцион" / "Auksionga"
  hint: string; // hover hint under the map
  statusLabels: Record<LotStatus, string>;
  /** Localized building-use captions, keyed by lot category */
  useLabels: Record<LotCategory, string>;
}

function pointsToSvg(points: [number, number][]): string {
  return points.map(([x, y]) => `${x},${y}`).join(' ');
}

// Anchor for the click popup: horizontal center + topmost / bottommost edge.
function anchor(points: [number, number][]) {
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const cx = xs.reduce((a, b) => a + b, 0) / xs.length;
  return { cx, top: Math.min(...ys), bottom: Math.max(...ys) };
}

export default function LotMap({ labels }: { labels: LotMapLabels }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<Lot | null>(null);
  const [selected, setSelected] = useState<Lot | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const counts = YANGI_LOTS.reduce<Record<LotStatus, number>>(
    (acc, l) => ({ ...acc, [l.status]: acc[l.status] + 1 }),
    { pending: 0, available: 0, sold: 0 }
  );

  // Popup anchor geometry (percent of the image box).
  const a = selected ? anchor(selected.points) : null;
  const placeBelow = a ? a.top < 22 : false; // near the top → drop below instead
  const popupLeft = a ? Math.min(Math.max(a.cx, 16), 84) : 0;
  const popupTop = a ? (placeBelow ? a.bottom : a.top) : 0;

  return (
    <div>
      <div className="text-center mb-10">
        <div className="accent-line mx-auto mb-6" />
        <h2 className="section-heading">{labels.title}</h2>
        <p className="section-subheading mx-auto">{labels.description}</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {(Object.keys(LOT_STATUS_COLOR) as LotStatus[]).map((s) => (
          <div key={s} className="flex items-center gap-2 text-sm text-gray-600">
            <span
              className="inline-block w-3.5 h-3.5 rounded-sm"
              style={{ backgroundColor: LOT_STATUS_COLOR[s] }}
            />
            <span className="font-medium">{labels.statusLabels[s]}</span>
            <span className="text-gray-400">({counts[s]})</span>
          </div>
        ))}
      </div>

      {/* Map */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-[#1a2744] select-none"
        style={{ aspectRatio: '1672 / 941' }}
        onMouseMove={handleMove}
        onMouseLeave={() => setHovered(null)}
        onClick={() => setSelected(null)}
      >
        {/* Lock the container to the source image's exact aspect ratio.
            Both the image and the SVG overlay then fill the same absolute
            box (inset-0), so zones stay pixel-aligned on every screen. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={labels.image}
          alt={labels.imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Overlay zones */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {YANGI_LOTS.map((lot) => {
            const color = LOT_STATUS_COLOR[lot.status];
            const isHot = hovered === lot || selected === lot;
            return (
              <polygon
                key={`${lot.category}-${lot.id}`}
                points={pointsToSvg(lot.points)}
                fill={color}
                fillOpacity={isHot ? 0.55 : 0.28}
                stroke={selected === lot ? '#ffffff' : color}
                strokeWidth={isHot ? 0.6 : 0.35}
                vectorEffect="non-scaling-stroke"
                className="cursor-pointer"
                style={{ transition: 'fill-opacity 0.15s ease' }}
                onMouseEnter={() => setHovered(lot)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected((prev) => (prev === lot ? null : lot));
                }}
              />
            );
          })}
        </svg>

        {/* Hover tooltip — info only, no buttons */}
        {hovered && hovered !== selected && (
          <div
            className="pointer-events-none absolute z-10 w-56"
            style={{
              left: Math.min(pos.x + 16, (containerRef.current?.clientWidth ?? 0) - 232),
              top: Math.max(pos.y - 16, 8),
            }}
          >
            <div className="rounded-xl bg-white/95 backdrop-blur shadow-xl border border-gray-100 overflow-hidden">
              <div
                className="px-3.5 py-2 flex items-center justify-between"
                style={{ backgroundColor: LOT_STATUS_COLOR[hovered.status] }}
              >
                <span className="text-white font-bold text-sm">
                  {labels.lotLabel} № {hovered.id}
                </span>
                <span className="text-white/90 text-[11px] font-semibold uppercase tracking-wide">
                  {labels.statusLabels[hovered.status]}
                </span>
              </div>
              <div className="px-3.5 py-2.5 space-y-1.5">
                <div className="text-xs text-gray-400">{labels.useLabels[hovered.category]}</div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{labels.areaLabel}</span>
                  <span className="font-semibold text-[#1a2744]">{hovered.area}</span>
                </div>
                {hovered.price && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{labels.priceLabel}</span>
                    <span className="font-semibold text-[#1a2744]">{hovered.price}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Click popup — anchored above (or below) the lot, with auction button */}
        {selected && a && (
          <div
            className="absolute z-20 w-64"
            style={{
              left: `${popupLeft}%`,
              top: `${popupTop}%`,
              transform: placeBelow
                ? 'translate(-50%, 12px)'
                : 'translate(-50%, calc(-100% - 12px))',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
              <div
                className="px-4 py-2.5 flex items-center justify-between"
                style={{ backgroundColor: LOT_STATUS_COLOR[selected.status] }}
              >
                <span className="text-white font-bold text-sm">
                  {labels.lotLabel} № {selected.id}
                </span>
                <span className="text-white/90 text-[11px] font-semibold uppercase tracking-wide">
                  {labels.statusLabels[selected.status]}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <div className="text-xs text-gray-400">{labels.useLabels[selected.category]}</div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{labels.areaLabel}</span>
                  <span className="font-semibold text-[#1a2744]">{selected.area}</span>
                </div>
                {selected.price && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{labels.priceLabel}</span>
                    <span className="font-semibold text-[#1a2744]">{selected.price}</span>
                  </div>
                )}
                {selected.status !== 'sold' && (
                  <a
                    href={selected.auctionUrl ?? DEFAULT_AUCTION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block w-full text-center rounded-lg bg-[#4a9c4e] hover:bg-[#3d8540] text-white text-sm font-semibold py-2.5 transition-colors"
                  >
                    {labels.auctionButton}
                  </a>
                )}
              </div>
            </div>
            {/* close button — floats on the card corner */}
            <button
              onClick={() => setSelected(null)}
              aria-label="close"
              className="absolute -top-2.5 -right-2.5 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-gray-500 hover:text-gray-800 text-base leading-none"
            >
              ×
            </button>
            {/* caret */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-gray-100"
              style={
                placeBelow
                  ? { top: -6, borderLeftWidth: 1, borderTopWidth: 1 }
                  : { bottom: -6, borderRightWidth: 1, borderBottomWidth: 1 }
              }
            />
          </div>
        )}
      </div>

      <p className="text-center text-gray-400 text-sm mt-4">{labels.hint}</p>
    </div>
  );
}
