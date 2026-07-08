'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { TranslationKeys } from '@/i18n/translations';

type HeroMap = TranslationKeys['home']['heroMap'];
type Pos = { top: number; left: number };
type PosMap = Record<string, Pos>;

const STORAGE_KEY = 'heroMapMobilePositions_v1';

// Compact overlay shown ONLY on portrait phones over the 9:16 hero video.
// Just the three investment zones (SEZ / Yangi / Oybek) as tappable labels.
// Positions are % of the hero section; drag them with ?edit=1 to fine-tune,
// then bake the values back into DEFAULT_POS below.
export const DEFAULT_POS: PosMap = {
  sez: { top: 57, left: 23 },
  oybek: { top: 33, left: 63 },
  yangi: { top: 52, left: 82 },
};

const HREF: Record<string, string> = {
  sez: '/sez',
  yangi: '/yangi-uzbekistan',
  oybek: '/oybek-ftz',
};

export default function HeroMapMobile({ m }: { m: HeroMap }) {
  const [editing, setEditing] = useState(false);
  const [pos, setPos] = useState<PosMap>(DEFAULT_POS);
  const containerRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    id: string;
    startX: number;
    startY: number;
    startTop: number;
    startLeft: number;
  } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    setEditing(params.get('edit') === '1');
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setPos({ ...DEFAULT_POS, ...JSON.parse(saved) });
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((next: PosMap) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const onPointerDown = useCallback(
    (id: string) => (e: React.PointerEvent) => {
      if (!editing) return;
      e.preventDefault();
      e.stopPropagation();
      try {
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      } catch {
        /* ignore */
      }
      drag.current = {
        id,
        startX: e.clientX,
        startY: e.clientY,
        startTop: pos[id]?.top ?? 0,
        startLeft: pos[id]?.left ?? 0,
      };
    },
    [editing, pos]
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const d = drag.current;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!d || !rect) return;
    const dx = ((e.clientX - d.startX) / rect.width) * 100;
    const dy = ((e.clientY - d.startY) / rect.height) * 100;
    const top = Math.min(98, Math.max(0, d.startTop + dy));
    const left = Math.min(98, Math.max(0, d.startLeft + dx));
    setPos((p) => ({ ...p, [d.id]: { top: +top.toFixed(2), left: +left.toFixed(2) } }));
  }, []);

  const onPointerUp = useCallback(() => {
    if (drag.current) {
      drag.current = null;
      setPos((p) => {
        persist(p);
        // eslint-disable-next-line no-console
        console.log('[heroMapMobilePositions]', JSON.stringify(p));
        return p;
      });
    }
  }, [persist]);

  const inner: Record<string, React.ReactNode> = {
    sez: (
      <div className="rounded-2xl bg-[#1a0b0b]/55 backdrop-blur-md border border-[#ef4444] shadow-[0_0_16px_rgba(239,68,68,0.7)] px-3 py-1.5 text-center">
        <div className="text-white font-bold leading-tight text-xs max-w-[130px]">{m.sezName}</div>
        <div className="mt-1 inline-block rounded-full bg-[#00d4ff] text-[#062a3a] text-[10px] font-bold px-2 py-0.5">{m.sezArea}</div>
      </div>
    ),
    oybek: (
      <div className="rounded-2xl bg-[#1a0b0b]/55 backdrop-blur-md border border-[#ef4444] shadow-[0_0_16px_rgba(239,68,68,0.7)] px-3 py-1.5 text-center">
        <div className="text-white font-bold leading-tight text-xs max-w-[130px]">{m.oybekName}</div>
        <div className="mt-1 inline-block rounded-full bg-[#00d4ff] text-[#062a3a] text-[10px] font-bold px-2 py-0.5">{m.oybekArea}</div>
      </div>
    ),
    yangi: (
      <div className="rounded-2xl bg-[#1a0b0b]/55 backdrop-blur-md border border-[#ef4444] shadow-[0_0_16px_rgba(239,68,68,0.7)] px-3 py-1.5 text-center">
        <div className="text-white font-bold leading-tight text-xs max-w-[140px]">{m.yangiName}</div>
        <div className="mt-1 inline-block rounded-full bg-[#00d4ff] text-[#062a3a] text-[10px] font-bold px-2 py-0.5">{m.yangiArea}</div>
      </div>
    ),
  };

  const ids = Object.keys(inner);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-20 block landscape:hidden select-none"
      onPointerMove={editing ? onPointerMove : undefined}
      onPointerUp={editing ? onPointerUp : undefined}
      style={{ pointerEvents: editing ? 'auto' : 'none' }}
    >
      {ids.map((id) => {
        const p = pos[id] ?? DEFAULT_POS[id];
        const wrapperStyle: React.CSSProperties = {
          top: `${p.top}%`,
          left: `${p.left}%`,
          transform: 'translate(-50%, -50%)',
        };

        if (editing) {
          return (
            <div
              key={id}
              className="absolute cursor-move ring-2 ring-[#00d4ff]/70 rounded-2xl"
              style={{ ...wrapperStyle, touchAction: 'none' }}
              onPointerDown={onPointerDown(id)}
            >
              {inner[id]}
              <span className="absolute -top-4 left-0 text-[9px] font-mono bg-[#00d4ff] text-black px-1 rounded">
                {id} {Math.round(p.top)},{Math.round(p.left)}
              </span>
            </div>
          );
        }

        return (
          <Link
            key={id}
            href={HREF[id]}
            className="absolute pointer-events-auto transition-transform active:scale-95"
            style={wrapperStyle}
          >
            {inner[id]}
          </Link>
        );
      })}
    </div>
  );
}
