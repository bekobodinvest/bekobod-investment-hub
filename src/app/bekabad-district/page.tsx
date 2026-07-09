'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import MapSection from '@/components/MapSection';

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// Fires once when the element first scrolls into view.
function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// Split a display string like "6,220.4", "+5.8%" or "749.69 km²" into an
// animatable number plus its prefix/suffix, preserving grouping & decimals.
function parseValue(value: string) {
  const m = value.match(/^(\D*?)([+-]?[\d,]*\.?\d+)(.*)$/);
  if (!m) return null;
  const [, prefix, numStr, suffix] = m;
  const grouped = numStr.includes(',');
  const clean = numStr.replace(/,/g, '');
  const dot = clean.indexOf('.');
  const decimals = dot === -1 ? 0 : clean.length - dot - 1;
  const target = parseFloat(clean);
  if (Number.isNaN(target)) return null;
  return { prefix, suffix, grouped, decimals, target };
}

function formatNumber(n: number, decimals: number, grouped: boolean) {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouped,
  });
}

// Counts up from 0 to the numeric part of `value` when scrolled into view.
function CountUp({
  value,
  duration = 1400,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const parsed = useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = useState(() =>
    parsed ? parsed.prefix + formatNumber(0, parsed.decimals, parsed.grouped) + parsed.suffix : value
  );

  useEffect(() => {
    if (!inView || !parsed) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    let startTs = 0;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(parsed.prefix + formatNumber(parsed.target * eased, parsed.decimals, parsed.grouped) + parsed.suffix);
      if (p < 1) raf = requestAnimationFrame(step);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed, value, duration]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {display}
    </span>
  );
}

// Progress bar that fills from 0 to `bar`% when scrolled into view.
function ProgressBar({ bar }: { bar: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#4a9c4e] to-[#3a7d3e]"
        style={{
          width: inView ? `${bar}%` : '0%',
          minWidth: inView ? '10px' : '0px',
          transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
    </div>
  );
}

// Values from the district passport (Jan–Sep 2025). Kept in the component as a
// single source of truth; labels come from translations.
const statValues = ['749.69 km²', '173,000', '1926', '51', '7.4%', '5.5%'];

const economyIcons = ['🏭', '🌾', '🛒'];
const economyValues = [
  { value: '389.8', unit: 'bn UZS', growth: '+5.8%' },
  { value: '4,031.7', unit: 'bn UZS', growth: '+4.0%' },
  { value: '1,103.6', unit: 'bn UZS', growth: '+15.6%' },
];

const laborValues = ['86,500', '66,300', '62,600', '32,400', '23,900'];

// Financial growth by sector (2025). bar = value / max value, as % width.
const financeIcons = ['🌾', '🛒', '🏭', '💰'];
const financeData = [
  { value: '6,220.4', bar: 100, growth: '104.4%' },
  { value: '1,519.5', bar: 24, growth: '117.2%' },
  { value: '569.8', bar: 9, growth: '110.7%' },
  { value: '101.7', bar: 2, growth: '117.7%' },
];

// Production volume 2025 (tonnes). bar = value / max value, as % width.
const productionIcons = ['🥩', '🥛', '🥚', '🐟'];
const productionData = [
  { value: '20,501', bar: 21, growth: '102%' },
  { value: '95,572', bar: 100, growth: '105%' },
  { value: '50,222', bar: 53, growth: '100%' },
  { value: '2,304', bar: 2, growth: '118%' },
];

const livestockIcons = ['🐂', '🐄', '🐑', '🐎', '🐔'];
const livestockValues = ['92,885', '38,541', '47,532', '4,211', '433'];

const landIcons = ['🗺️', '🌿', '🌾', '🌷', '🚜'];
const landValues = ['39,297', '29,500', '2,991', '1,680', '4,308'];

const socialIcons = ['🏫', '🧸', '🏥', '🎓', '🏟️', '🏛️'];
const socialValues = ['63', '245', '21', '2', '8', '32'];


const businessValues = ['1,117', '254', '1,821'];

export default function BekabadDistrictPage() {
  const { t } = useLanguage();
  const d = t.bekabadDistrict;
  useScrollAnimation();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#1a2744] to-[#1a3530] relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              {d.title}
            </h1>
            <p className="text-xl text-[#4a9c4e] font-medium mb-6">{d.subtitle}</p>
            <p className="text-gray-300 leading-relaxed text-lg">{d.overview.description}</p>
          </div>
        </div>
      </section>

      {/* Key figures strip */}
      <section className="py-12 bg-[#1a2744]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {d.stats.map((stat, i) => (
              <div
                key={i}
                className="animate-on-scroll text-center p-5 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <CountUp value={statValues[i]} className="block text-[#4a9c4e] font-black text-xl md:text-2xl" />
                <div className="text-gray-400 text-xs mt-1 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Economy */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14 animate-on-scroll">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">{d.economy.title}</h2>
            <p className="section-subheading mx-auto">{d.economy.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {d.economy.items.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll card p-8 border border-gray-100 group hover:border-[#4a9c4e]/30"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl mb-4">{economyIcons[i]}</div>
                <h3 className="font-bold text-[#1a2744] text-lg mb-3 group-hover:text-[#4a9c4e] transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <CountUp value={economyValues[i].value} className="text-3xl font-black text-[#1a2744]" />
                  <span className="text-gray-500 text-sm font-medium">{d.economy.unit}</span>
                  <CountUp value={economyValues[i].growth} className="ml-auto text-[#4a9c4e] font-bold text-sm" />
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {d.economy.highlights.map((h, i) => (
              <div
                key={i}
                className="animate-on-scroll flex items-center gap-3 p-5 bg-[#e8f5e9] rounded-[2rem] border border-[#4a9c4e]/20"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-9 h-9 rounded-full bg-[#4a9c4e] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[#1a2744] text-sm font-medium leading-tight">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial growth rates */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14 animate-on-scroll">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">{d.financeGrowth.title}</h2>
            <p className="section-subheading mx-auto">{d.financeGrowth.subtitle}</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {d.financeGrowth.items.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll card p-5 md:p-6 border border-gray-100"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl flex-shrink-0">{financeIcons[i]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-3 mb-2 flex-wrap">
                      <span className="font-bold text-[#1a2744] text-sm md:text-base">{item.label}</span>
                      <span className="flex items-baseline gap-1">
                        <CountUp value={financeData[i].value} className="text-xl md:text-2xl font-black text-[#1a2744]" />
                        <span className="text-gray-500 text-xs font-medium">{d.financeGrowth.unit}</span>
                      </span>
                    </div>
                    <ProgressBar bar={financeData[i].bar} />
                  </div>
                  <div className="flex flex-col items-center flex-shrink-0 w-20">
                    <span className="inline-flex items-center gap-1 text-[#4a9c4e] font-black text-base md:text-lg">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <CountUp value={financeData[i].growth} />
                    </span>
                    <span className="text-gray-400 text-[10px] mt-0.5 leading-tight text-center">{d.financeGrowth.growthCaption}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Livestock & Farmland */}
      <section className="section-padding bg-[#1a2744]">
        <div className="container-custom">
          <div className="text-center mb-12 animate-on-scroll">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{d.agriculture.title}</h2>
            <p className="text-gray-400">{d.agriculture.subtitle}</p>
          </div>

          {/* Livestock */}
          <h3 className="text-[#4a9c4e] font-bold uppercase tracking-wide text-sm mb-4 animate-on-scroll">
            {d.agriculture.livestockTitle}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {d.agriculture.livestock.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll flex items-center gap-4 p-5 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="text-3xl flex-shrink-0">{livestockIcons[i]}</div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-1 flex-wrap">
                    <CountUp value={livestockValues[i]} className="text-2xl font-black text-[#4a9c4e] leading-none" />
                    <span className="text-gray-400 text-xs">{item.unit}</span>
                  </div>
                  <div className="text-gray-400 text-xs mt-1 leading-tight">{item.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Agricultural land */}
          <h3 className="text-[#4a9c4e] font-bold uppercase tracking-wide text-sm mb-4 animate-on-scroll">
            {d.agriculture.landTitle}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {d.agriculture.land.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll flex items-center gap-4 p-5 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="text-3xl flex-shrink-0">{landIcons[i]}</div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-1 flex-wrap">
                    <CountUp value={landValues[i]} className="text-2xl font-black text-[#4a9c4e] leading-none" />
                    <span className="text-gray-400 text-xs">{item.unit}</span>
                  </div>
                  <div className="text-gray-400 text-xs mt-1 leading-tight">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production volume 2025 */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14 animate-on-scroll">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">{d.production.title}</h2>
            <p className="section-subheading mx-auto">{d.production.subtitle}</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {d.production.items.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll card p-5 md:p-6 border border-gray-100"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl flex-shrink-0">{productionIcons[i]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-3 mb-2 flex-wrap">
                      <span className="font-bold text-[#1a2744] text-sm md:text-base">{item.label}</span>
                      <span className="flex items-baseline gap-1">
                        <CountUp value={productionData[i].value} className="text-xl md:text-2xl font-black text-[#1a2744]" />
                        <span className="text-gray-500 text-xs font-medium">{d.production.unit}</span>
                      </span>
                    </div>
                    <ProgressBar bar={productionData[i].bar} />
                  </div>
                  <div className="flex flex-col items-center flex-shrink-0 w-20">
                    <span className="inline-flex items-center gap-1 text-[#4a9c4e] font-black text-base md:text-lg">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <CountUp value={productionData[i].growth} />
                    </span>
                    <span className="text-gray-400 text-[10px] mt-0.5 leading-tight text-center">{d.production.growthCaption}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Labor & Employment */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14 animate-on-scroll">
            <h2 className="section-heading">{d.labor.title}</h2>
            <p className="section-subheading mx-auto">{d.labor.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {d.labor.items.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll card p-6 text-center border border-gray-100"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <CountUp value={laborValues[i]} className="block text-2xl md:text-3xl font-black text-[#1a2744]" />
                <div className="text-gray-500 text-xs mt-2 leading-tight">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social infrastructure */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14 animate-on-scroll">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">{d.social.title}</h2>
            <p className="section-subheading mx-auto">{d.social.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {d.social.items.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll card p-6 text-center border border-gray-100 group hover:border-[#4a9c4e]/30"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="text-3xl mb-3">{socialIcons[i]}</div>
                <CountUp value={socialValues[i]} className="block text-2xl font-black text-[#4a9c4e]" />
                <div className="text-gray-500 text-xs mt-1 leading-tight">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Small business banner */}
      <section className="py-16 bg-gradient-to-r from-[#4a9c4e] to-[#3a7d3e]">
        <div className="container-custom">
          <div className="text-center mb-10 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{d.business.title}</h2>
            <p className="text-white/80">{d.business.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {d.business.items.map((item, i) => (
              <div key={i} className="animate-on-scroll" style={{ transitionDelay: `${i * 100}ms` }}>
                <CountUp value={businessValues[i]} className="block text-5xl font-black text-white mb-2" />
                <div className="text-white/90 font-semibold">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section-padding bg-white">
        <div className="container-custom animate-on-scroll">
          <MapSection
            title={d.map.title}
            description={d.map.description}
            googleLabel={d.map.button}
            yandexLabel={d.map.yandexButton}
            googleUrl="https://maps.app.goo.gl/P9fQayt1cdnUjG4w6"
            yandexUrl="https://yandex.uz/maps/-/CTubr0IB"
            embedQuery="40.383995,69.255059"
          />
        </div>
      </section>
    </>
  );
}
