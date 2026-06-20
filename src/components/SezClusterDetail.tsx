'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  SEZ_LOTS,
  SEZ_LOTS_TOTAL_GA,
  lotPrice,
  usd,
  SEZ_LAND_USD_PER_GA,
  SEZ_LOSS_USD_PER_GA,
  type SezLot,
} from '@/data/sezLots';
import { SEZ_ZONES, type SezZoneId } from '@/data/sezZones';
import { useLanguage } from '@/context/LanguageContext';

const IMAGE = '/sez_aerial.png';
const IMG_ASPECT = 2400 / 1792;

type Pt = [number, number];

const centroid = (pts: Pt[]): Pt => {
  let cx = 0, cy = 0;
  for (const [x, y] of pts) { cx += x; cy += y; }
  return [cx / pts.length, cy / pts.length];
};

export default function SezClusterDetail({ zoneId }: { zoneId: SezZoneId }) {
  const { t } = useLanguage();
  const td = t.sez.clusterDetail;
  const lotsLabel = t.sez.clustersMap.lotsLabel;

  const zone = SEZ_ZONES.find((z) => z.id === zoneId)!;
  const zoneIndex = SEZ_ZONES.findIndex((z) => z.id === zoneId);
  const sectorName = t.sez.sectors.items[zoneIndex]?.name ?? zone.name;

  const lots = useMemo(
    () => SEZ_LOTS.filter((l) => l.zone === zoneId && l.points.length),
    [zoneId]
  );
  const totalGa = useMemo(() => lots.reduce((s, l) => s + l.areaGa, 0), [lots]);

  const [hover, setHover] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  // Zoom: square bbox over the cluster's lots → fills the image-aspect viewport.
  const view = useMemo(() => {
    let minX = 100, minY = 100, maxX = 0, maxY = 0;
    for (const l of lots)
      for (const [x, y] of l.points) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    let side = Math.min(100, Math.max(maxX - minX, maxY - minY) * 1.18);
    let ox = Math.max(0, Math.min(100 - side, cx - side / 2));
    let oy = Math.max(0, Math.min(100 - side, cy - side / 2));
    return { ox, oy, k: 100 / side };
  }, [lots]);

  const { ox, oy, k } = view;
  const transform = `scale(${k}) translate(${-ox}%, ${-oy}%)`;

  // On-screen position (% of the viewport box) of a 0..100 point under the zoom.
  const posX = (x: number) => (x - ox) * k;
  const posY = (y: number) => (y - oy) * k;

  const selLot: SezLot | undefined = lots.find((l) => l.id === selected);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/sez"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1a2744] mb-4"
        >
          <span aria-hidden>←</span> {td.back}
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-white text-sm font-bold shrink-0"
            style={{ background: zone.color }}
          >
            {zoneIndex + 1}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1a2744]">{sectorName}</h1>
          <span className="ml-auto text-sm text-gray-500">
            {lots.length} {lotsLabel} · {totalGa.toFixed(1)} GA
          </span>
        </div>
        <p className="text-gray-500 text-sm mt-2">{td.hint}</p>
      </div>

      {/* Zoomed map */}
      <div
        className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-[#1a2744] select-none"
        style={{ aspectRatio: `${IMG_ASPECT}` }}
        onClick={() => setSelected(null)}
      >
        {/* Transformed image + lots */}
        <div className="absolute inset-0 origin-top-left" style={{ transform }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGE}
            alt={sectorName}
            className="block w-full h-auto pointer-events-none"
            draggable={false}
          />
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {lots.map((l) => {
              const isHov = hover === l.id;
              const isSel = selected === l.id;
              const active = isHov || isSel;
              return (
                <polygon
                  key={l.id}
                  points={l.points.map((p) => p.join(',')).join(' ')}
                  fill={zone.color}
                  fillOpacity={active ? 0.75 : 0.4}
                  stroke={isSel ? '#ffffff' : zone.color}
                  strokeWidth={active ? 0.6 : 0.3}
                  vectorEffect="non-scaling-stroke"
                  style={{ cursor: 'pointer' }}
                  onPointerEnter={() => setHover(l.id)}
                  onPointerLeave={() => setHover((h) => (h === l.id ? null : h))}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(l.id);
                  }}
                />
              );
            })}
          </svg>
        </div>

        {/* Hover tooltip */}
        {hover && hover !== selected && (() => {
          const l = lots.find((x) => x.id === hover)!;
          const [cx, cy] = centroid(l.points);
          const { total } = lotPrice(l.areaGa);
          return (
            <div
              className="absolute z-10 -translate-x-1/2 -translate-y-full -mt-2 pointer-events-none whitespace-nowrap rounded-lg bg-[#1a2744]/95 backdrop-blur-sm text-white px-3 py-2 shadow-xl"
              style={{ left: `${posX(cx)}%`, top: `${posY(cy)}%` }}
            >
              <div className="text-sm font-bold">{td.lot} {l.id.replace('LOT', '№')}</div>
              <div className="text-[11px] text-gray-300">
                {l.area} · {usd(total)}
              </div>
            </div>
          );
        })()}

        {/* Click popup */}
        {selLot && (() => {
          const [cx, cy] = centroid(selLot.points);
          const price = lotPrice(selLot.areaGa);
          const above = posY(cy) > 55;
          return (
            <div
              className="absolute z-20 w-60 -translate-x-1/2 rounded-xl bg-white shadow-2xl border border-gray-200 overflow-hidden"
              style={{
                left: `${Math.min(85, Math.max(15, posX(cx)))}%`,
                top: `${posY(cy)}%`,
                transform: `translate(-50%, ${above ? 'calc(-100% - 12px)' : '12px'})`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-3 flex items-center gap-2" style={{ background: zone.color }}>
                <span className="text-white font-bold text-sm">
                  {td.lot} {selLot.id.replace('LOT', '№')}
                </span>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="ml-auto text-white/80 hover:text-white text-lg leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="p-4 space-y-2 text-sm">
                <Row label={td.area} value={`${selLot.area}`} />
                <Row label={`${td.landCost} ($${SEZ_LAND_USD_PER_GA.toLocaleString('en-US')}/GA)`} value={usd(price.land)} />
                <Row label={`${td.lossFee} ($${SEZ_LOSS_USD_PER_GA.toLocaleString('en-US')}/GA)`} value={usd(price.loss)} />
                <div className="border-t border-gray-100 pt-2 flex items-center justify-between">
                  <span className="font-semibold text-[#1a2744]">{td.total}</span>
                  <span className="font-bold text-[#1a2744]">{usd(price.total)}</span>
                </div>
                <div className="text-[11px] text-gray-400">{td.installment}</div>
                <a
                  href="#"
                  className="mt-2 block text-center rounded-lg bg-[#4a9c4e] hover:bg-[#3d8540] text-white font-semibold py-2 transition-colors"
                >
                  {td.auction}
                </a>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-gray-500">{label}</span>
      <span className="text-[#1a2744] font-medium whitespace-nowrap">{value}</span>
    </div>
  );
}
