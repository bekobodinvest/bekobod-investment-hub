'use client';

import { useRef, useState, useCallback } from 'react';
import {
  YANGI_LOTS,
  LOT_STATUS_COLOR,
  DEFAULT_AUCTION_URL,
  type Lot,
  type LotStatus,
} from '@/data/yangiLots';

export interface LotMapLabels {
  title: string;
  description: string;
  /** image src under /public, e.g. "/yangi_aerial.jpg" */
  image: string;
  imageAlt: string;
  lotLabel: string; // "Lot" / "Лот" / "Lot"
  areaLabel: string; // "Area" / "Площадь" / "Maydoni"
  priceLabel: string; // "Starting price" / "Стартовая цена" / "Boshlang'ich narx"
  auctionButton: string; // "Bid on auction" / "На аукцион" / "Auksionga"
  hint: string; // hover hint under the map
  statusLabels: Record<LotStatus, string>;
}

function pointsToSvg(points: [number, number][]): string {
  return points.map(([x, y]) => `${x},${y}`).join(' ');
}

export default function LotMap({ labels }: { labels: LotMapLabels }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Lot | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const counts = YANGI_LOTS.reduce<Record<LotStatus, number>>(
    (acc, l) => ({ ...acc, [l.status]: acc[l.status] + 1 }),
    { available: 0, reserved: 0, sold: 0 }
  );

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
        onMouseLeave={() => setActive(null)}
      >
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
            const isActive = active === lot;
            return (
              <g
                key={`${lot.category}-${lot.id}`}
                className="cursor-pointer"
                onMouseEnter={() => setActive(lot)}
                onClick={() => setActive(lot)}
              >
                <polygon
                  points={pointsToSvg(lot.points)}
                  fill={color}
                  fillOpacity={isActive ? 0.55 : 0.28}
                  stroke={color}
                  strokeWidth={isActive ? 0.6 : 0.35}
                  vectorEffect="non-scaling-stroke"
                  style={{ transition: 'fill-opacity 0.15s ease' }}
                />
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {active && (
          <div
            className="pointer-events-none absolute z-20 w-60"
            style={{
              left: Math.min(pos.x + 16, (containerRef.current?.clientWidth ?? 0) - 250),
              top: Math.max(pos.y - 16, 8),
            }}
          >
            <div className="pointer-events-auto rounded-xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
              <div
                className="px-4 py-2.5 flex items-center justify-between"
                style={{ backgroundColor: LOT_STATUS_COLOR[active.status] }}
              >
                <span className="text-white font-bold text-sm">
                  {labels.lotLabel} № {active.id}
                </span>
                <span className="text-white/90 text-[11px] font-semibold uppercase tracking-wide">
                  {labels.statusLabels[active.status]}
                </span>
              </div>
              <div className="p-4 space-y-2">
                {active.use && (
                  <div className="text-xs text-gray-400">{active.use}</div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{labels.areaLabel}</span>
                  <span className="font-semibold text-[#1a2744]">{active.area}</span>
                </div>
                {active.price && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{labels.priceLabel}</span>
                    <span className="font-semibold text-[#1a2744]">{active.price}</span>
                  </div>
                )}
                {active.status !== 'sold' && (
                  <a
                    href={active.auctionUrl ?? DEFAULT_AUCTION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block w-full text-center rounded-lg bg-[#4a9c4e] hover:bg-[#3d8540] text-white text-sm font-semibold py-2 transition-colors"
                  >
                    {labels.auctionButton}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-gray-400 text-sm mt-4">{labels.hint}</p>
    </div>
  );
}
