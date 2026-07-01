'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { TranslationKeys } from '@/i18n/translations';

type HeroMap = TranslationKeys['home']['heroMap'];
type Pos = { top: number; left: number };
type PosMap = Record<string, Pos>;

const STORAGE_KEY = 'heroMapPositions_v1';

// Default positions (% of the hero section). Edit mode lets you drag and
// override these; once you're happy, the values get baked in here.
export const DEFAULT_POS: PosMap = {
  district: { top: 9.79, left: 5.22 },
  tashkent: { top: 15.66, left: 58.11 },
  railway: { top: 42.22, left: 29.69 },
  oybek: { top: 29.05, left: 45.14 },
  highway: { top: 75.72, left: 62.65 },
  yangi: { top: 50.54, left: 73.72 },
  sez: { top: 78.23, left: 14.55 },
  total: { top: 17.2, left: 5.32 },
  routes: { top: 73.94, left: 82.28 },
  countryUz: { top: 13.85, left: 66.93 },
  countryTj: { top: 13.65, left: 81.24 },
  guliston: { top: 87.93, left: 66.12 },
};

const HREF: Record<string, string | undefined> = {
  oybek: '/oybek-ftz',
  yangi: '/yangi-uzbekistan',
  sez: '/sez',
};

export default function HeroMapOverlay({ m }: { m: HeroMap }) {
  const [editing, setEditing] = useState(false);
  const [pos, setPos] = useState<PosMap>(DEFAULT_POS);
  const containerRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; startX: number; startY: number; startTop: number; startLeft: number } | null>(null);

  // Enable edit mode via ?edit=1 and load any saved positions.
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
        /* synthetic / inactive pointer */
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

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const d = drag.current;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!d || !rect) return;
      const dx = ((e.clientX - d.startX) / rect.width) * 100;
      const dy = ((e.clientY - d.startY) / rect.height) * 100;
      const top = Math.min(98, Math.max(0, d.startTop + dy));
      const left = Math.min(98, Math.max(0, d.startLeft + dx));
      setPos((p) => ({ ...p, [d.id]: { top: +top.toFixed(2), left: +left.toFixed(2) } }));
    },
    []
  );

  const onPointerUp = useCallback(() => {
    if (drag.current) {
      drag.current = null;
      setPos((p) => {
        persist(p);
        return p;
      });
    }
  }, [persist]);

  const exportJson = useCallback(() => {
    const json = JSON.stringify(pos, null, 2);
    navigator.clipboard?.writeText(json);
    // eslint-disable-next-line no-console
    console.log('[heroMapPositions]', json);
    alert('Pozitsiyalar saqlandi va nusxalandi (clipboard).');
  }, [pos]);

  const reset = useCallback(() => {
    setPos(DEFAULT_POS);
    persist(DEFAULT_POS);
  }, [persist]);

  // Each label's inner markup (positioning handled by the wrapper).
  const inner: Record<string, React.ReactNode> = {
    district: (
      <div className="rounded-[1.5rem] bg-[#0b1830]/50 backdrop-blur-md border border-[#1e9bff] shadow-[0_0_14px_rgba(30,155,255,0.55),inset_0_0_10px_rgba(30,155,255,0.12)] px-5 py-3.5">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-[#1e9bff]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>
          <span className="text-white font-extrabold tracking-wide text-xl xl:text-2xl">{m.district}</span>
        </div>
        <p className="text-gray-300 text-lg xl:text-xl mt-1 pl-7">{m.districtSub}</p>
      </div>
    ),
    tashkent: (
      <div className="flex items-center gap-2 text-white whitespace-nowrap">
        <span className="text-[#1e9bff] text-xl">↑</span>
        <span className="text-lg xl:text-xl font-semibold">{m.tashkent} <span className="text-gray-300 font-normal">{m.tashkentDist}</span></span>
      </div>
    ),
    railway: (
      <div className="rounded-full bg-[#0b1830]/50 backdrop-blur-md border border-[#1e9bff] shadow-[0_0_14px_rgba(30,155,255,0.55),inset_0_0_10px_rgba(30,155,255,0.12)] px-4 py-2 flex items-center gap-2 whitespace-nowrap">
        <svg className="w-6 h-6 text-[#1e9bff]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c-4 0-8 .5-8 4v9.5A3.5 3.5 0 007.5 19L6 20.5v.5h12v-.5L16.5 19a3.5 3.5 0 003.5-3.5V6c0-3.5-4-4-8-4zM7.5 17A1.5 1.5 0 119 15.5 1.5 1.5 0 017.5 17zm3.5-7H6V6h5zm2 0V6h5v4zm3.5 7a1.5 1.5 0 111.5-1.5 1.5 1.5 0 01-1.5 1.5z"/></svg>
        <span className="text-white text-lg xl:text-xl font-medium">{m.railway}</span>
      </div>
    ),
    oybek: (
      <div className="rounded-[1.5rem] bg-[#0b1f12]/50 backdrop-blur-md border border-[#22c55e] shadow-[0_0_18px_rgba(34,197,94,0.7),inset_0_0_12px_rgba(34,197,94,0.18)] px-5 py-3 text-center">
        <div className="mx-auto text-white font-bold leading-tight text-lg xl:text-xl max-w-[240px]">{m.oybekName}</div>
        <div className="mt-1.5 inline-block rounded-full bg-[#22c55e] text-[#06210f] text-base xl:text-lg font-bold px-2.5 py-0.5">{m.oybekArea}</div>
      </div>
    ),
    highway: (
      <div className="rounded-full bg-[#0b1830]/50 backdrop-blur-md border border-[#1e9bff] shadow-[0_0_14px_rgba(30,155,255,0.55),inset_0_0_10px_rgba(30,155,255,0.12)] px-4 py-2 flex items-center gap-2 whitespace-nowrap">
        <svg className="w-6 h-6 text-[#1e9bff]" fill="currentColor" viewBox="0 0 24 24"><path d="M5 11l1.5-4.5A2 2 0 018.4 5h7.2a2 2 0 011.9 1.5L19 11h.5a1.5 1.5 0 011.5 1.5V17a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H6v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-4.5A1.5 1.5 0 014.5 11H5zm2.2-1h9.6l-1-3H8.2l-1 3zM6.5 15a1 1 0 100-2 1 1 0 000 2zm11 0a1 1 0 100-2 1 1 0 000 2z"/></svg>
        <span className="text-white text-lg xl:text-xl font-medium">{m.highway}</span>
      </div>
    ),
    yangi: (
      <div className="rounded-[1.5rem] bg-[#0b1830]/50 backdrop-blur-md border border-[#1e9bff] shadow-[0_0_18px_rgba(30,155,255,0.7),inset_0_0_12px_rgba(30,155,255,0.18)] px-5 py-3 text-center">
        <div className="text-white font-bold leading-tight text-lg xl:text-xl max-w-[260px]">{m.yangiName}</div>
        <div className="mt-1.5 inline-block rounded-full bg-[#1e9bff] text-white text-base xl:text-lg font-bold px-2.5 py-0.5">{m.yangiArea}</div>
      </div>
    ),
    sez: (
      <div className="rounded-[1.5rem] bg-[#0b1830]/50 backdrop-blur-md border border-[#1e9bff] shadow-[0_0_18px_rgba(30,155,255,0.7),inset_0_0_12px_rgba(30,155,255,0.18)] px-5 py-3 text-center">
        <div className="text-white font-bold leading-tight text-lg xl:text-xl max-w-[240px]">{m.sezName}</div>
        <div className="mt-1.5 inline-block rounded-full bg-[#1e9bff] text-white text-base xl:text-lg font-bold px-2.5 py-0.5">{m.sezArea}</div>
      </div>
    ),
    total: (
      <div className="rounded-[1.5rem] bg-[#0b1830]/50 backdrop-blur-md border border-[#1e9bff] shadow-[0_0_14px_rgba(30,155,255,0.55),inset_0_0_10px_rgba(30,155,255,0.12)] px-5 py-4 space-y-2.5 max-w-[350px]">
        <div className="flex items-start gap-2.5">
          <svg className="w-6 h-6 text-[#1e9bff] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>
          <div>
            <div className="text-gray-300 text-base xl:text-lg">{m.totalArea}</div>
            <div className="text-white font-extrabold text-2xl xl:text-3xl leading-tight">{m.totalAreaValue}</div>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <svg className="w-6 h-6 text-[#1e9bff] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M3 21V9l9-6 9 6v12h-6v-7h-6v7H3z"/></svg>
          <div className="text-white text-lg xl:text-xl leading-tight">{m.region}<br/><span className="text-gray-300">{m.country}</span></div>
        </div>
        <div className="flex items-start gap-2.5">
          <svg className="w-6 h-6 text-[#1e9bff] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" strokeWidth="1.2"/></svg>
          <div className="text-white text-lg xl:text-xl leading-tight font-medium">{m.strategicTitle}<br/><span className="text-gray-300 font-normal">{m.strategicSub}</span></div>
        </div>
      </div>
    ),
    routes: (
      <div className="rounded-[1.5rem] bg-[#0b1830]/50 backdrop-blur-md border border-[#1e9bff] shadow-[0_0_14px_rgba(30,155,255,0.55),inset_0_0_10px_rgba(30,155,255,0.12)] px-5 py-4 min-w-[400px]">
        <div className="flex justify-between text-[#1e9bff] font-bold text-base xl:text-lg tracking-wider mb-2">
          <span>{m.routeHeader}</span><span>{m.distanceHeader}</span>
        </div>
        {[[m.route5, m.route5Dist], [m.route1, m.route1Dist], [m.route3, m.route3Dist], [m.route4, m.route4Dist]].map(([r, d], i) => (
          <div key={i} className="flex justify-between items-center gap-5 py-1.5 border-t border-white/5 text-white text-lg xl:text-xl">
            <span className="flex items-center gap-2"><svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M5 11l1.5-4.5A2 2 0 018.4 5h7.2a2 2 0 011.9 1.5L19 11h.5a1.5 1.5 0 011.5 1.5V17a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H6v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-4.5A1.5 1.5 0 014.5 11H5z"/></svg>{r}</span>
            <span className="text-gray-200 font-semibold whitespace-nowrap">{d}</span>
          </div>
        ))}
      </div>
    ),
    countryUz: (
      <div className="text-white font-extrabold tracking-widest text-2xl xl:text-4xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap">{m.countryUz}</div>
    ),
    countryTj: (
      <div className="text-[#f5a623] font-extrabold tracking-widest text-2xl xl:text-4xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap">{m.countryTj}</div>
    ),
    guliston: (
      <div className="text-center text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap">
        <div className="font-semibold text-lg xl:text-xl">{m.guliston}</div>
        <div className="text-gray-300 text-base xl:text-lg">↓ {m.gulistonDist}</div>
      </div>
    ),
  };

  const ids = Object.keys(inner);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-20 hidden lg:block select-none"
      onPointerMove={editing ? onPointerMove : undefined}
      onPointerUp={editing ? onPointerUp : undefined}
      style={{ pointerEvents: editing ? 'auto' : 'none' }}
    >
      {ids.map((id) => {
        const p = pos[id] ?? DEFAULT_POS[id];
        const href = HREF[id];
        const wrapperStyle: React.CSSProperties = { top: `${p.top}%`, left: `${p.left}%` };
        const editClasses = editing
          ? 'cursor-move ring-2 ring-[#00d4ff]/70 ring-offset-0 rounded-lg'
          : '';

        const content = (
          <>
            {inner[id]}
            {editing && (
              <span className="absolute -top-5 left-0 text-[10px] font-mono bg-[#00d4ff] text-black px-1 rounded">
                {id} {Math.round(p.top)},{Math.round(p.left)}
              </span>
            )}
          </>
        );

        if (editing) {
          return (
            <div
              key={id}
              className={`absolute ${editClasses}`}
              style={{ ...wrapperStyle, touchAction: 'none' }}
              onPointerDown={onPointerDown(id)}
            >
              {content}
            </div>
          );
        }

        if (href) {
          return (
            <Link
              key={id}
              href={href}
              className="absolute pointer-events-auto transition-transform hover:scale-[1.03]"
              style={wrapperStyle}
            >
              {inner[id]}
            </Link>
          );
        }

        return (
          <div key={id} className="absolute pointer-events-none" style={wrapperStyle}>
            {inner[id]}
          </div>
        );
      })}

      {editing && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#0b1830] border border-[#00d4ff]/50 rounded-xl px-4 py-3 shadow-2xl pointer-events-auto">
          <span className="text-[#00d4ff] text-xs font-bold tracking-wide">EDIT MODE — перетаскивай подписи</span>
          <button onClick={exportJson} className="bg-[#00d4ff] text-black text-sm font-bold px-3 py-1.5 rounded-lg hover:bg-[#33ddff]">Сохранить</button>
          <button onClick={reset} className="bg-white/10 text-white text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-white/20">Сбросить</button>
        </div>
      )}
    </div>
  );
}
