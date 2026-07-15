'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

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

function TaxTable({
  title,
  subtitle,
  headers,
  rows,
  highlightLast = true,
}: {
  title: string;
  subtitle: string;
  headers: readonly string[];
  rows: readonly { readonly investment: string; readonly period: string }[];
  highlightLast?: boolean;
}) {
  return (
    <div className="animate-on-scroll card overflow-hidden border border-gray-200">
      {/* Table header */}
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-bold text-[#1a2744]">{title}</h3>
        <p className="text-sm text-[#4a9c4e] font-medium mt-1">{subtitle}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full investment-table">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={highlightLast && i === rows.length - 1 ? 'font-bold' : ''}
              >
                <td className="font-medium text-[#1a2744]">{row.investment}</td>
                <td>
                  <span className={`inline-flex items-center gap-1.5 font-bold ${
                    i === rows.length - 1 ? 'text-[#1a2744]' : 'text-[#4a9c4e]'
                  }`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {row.period}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function IncentivesPage() {
  const { t } = useLanguage();
  useScrollAnimation();

  const additionalIcons = [
    <svg key={0} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    <svg key={1} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
    <svg key={2} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>,
    <svg key={3} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    <svg key={4} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    <svg key={5} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#1a2744] to-[#243660] relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#4a9c4e]/10 blur-3xl" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="green-badge mb-5">{t.incentives.badge}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              {t.incentives.title}
            </h1>
            <p className="text-xl text-[#4a9c4e] font-medium mb-6">{t.incentives.subtitle}</p>
            <p className="text-gray-300 leading-relaxed text-lg text-justify">{t.incentives.overview.description}</p>
          </div>
        </div>
      </section>

      {/* Key numbers strip */}
      <section className="py-10 bg-[#4a9c4e]">
        <div className="container-custom">
          <div className="grid grid-cols-3 gap-4 text-center text-white">
            {t.incentives.keyNumbers.map((item, i) => (
              <div key={i} className="animate-on-scroll" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="text-3xl md:text-4xl font-black">{item.value}</div>
                <div className="text-white/80 text-sm mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Tables */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14 animate-on-scroll">
            <h2 className="section-heading">{t.incentives.taxSchedulesTitle}</h2>
            <div className="accent-line mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <TaxTable
              title={t.incentives.corporate.title}
              subtitle={t.incentives.corporate.subtitle}
              headers={t.incentives.corporate.headers}
              rows={t.incentives.corporate.table}
            />
            <TaxTable
              title={t.incentives.land.title}
              subtitle={t.incentives.land.subtitle}
              headers={t.incentives.land.headers}
              rows={t.incentives.land.table}
            />
          </div>

          {/* Property tax */}
          <div className="animate-on-scroll bg-gradient-to-r from-[#1a2744] to-[#243660] rounded-[2rem] p-8 text-white">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#4a9c4e]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{t.incentives.property.title}</h3>
                <p className="text-[#4a9c4e] text-sm font-medium mb-2">{t.incentives.property.subtitle}</p>
                <p className="text-gray-300 leading-relaxed text-justify">{t.incentives.property.note}</p>
              </div>
            </div>
          </div>

          {/* Water resources tax */}
          <div className="animate-on-scroll bg-gradient-to-r from-[#1a2744] to-[#243660] rounded-[2rem] p-8 text-white">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#4a9c4e]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{t.incentives.water.title}</h3>
                <p className="text-[#4a9c4e] text-sm font-medium mb-2">{t.incentives.water.subtitle}</p>
                <p className="text-gray-300 leading-relaxed text-justify">{t.incentives.water.note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customs Benefits */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14 animate-on-scroll">
            <h2 className="section-heading">{t.incentives.customs.title}</h2>
            <p className="section-subheading mx-auto">{t.incentives.customs.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.incentives.customs.items.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll card p-7 border border-gray-100 hover:border-[#4a9c4e]/30"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#e8f5e9] flex items-center justify-center mb-4 text-[#4a9c4e]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#1a2744] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed text-justify">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Framework */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="section-heading">{t.incentives.legal.title}</h2>
            <p className="section-subheading mx-auto">{t.incentives.legal.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {t.incentives.legal.items.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll card p-8 border border-gray-100 hover:border-[#4a9c4e]/30"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1a2744] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a2744] text-lg mb-1">{item.title}</h3>
                    <div className="text-[#4a9c4e] text-sm font-semibold mb-3">{item.detail}</div>
                    <p className="text-gray-500 text-sm leading-relaxed text-justify">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14 animate-on-scroll">
            <h2 className="section-heading">{t.incentives.additional.title}</h2>
            <p className="section-subheading mx-auto">{t.incentives.additional.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.incentives.additional.items.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll card p-7 border border-gray-100 hover:border-[#4a9c4e]/30 group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#e8f5e9] flex items-center justify-center mb-4 text-[#4a9c4e] group-hover:bg-[#4a9c4e] group-hover:text-white transition-colors">
                  {additionalIcons[i]}
                </div>
                <h3 className="font-bold text-[#1a2744] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed text-justify">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#1a2744] to-[#243660]">
        <div className="container-custom text-center animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            {t.incentives.cta.title}
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            {t.incentives.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://e-auksion.uz/lots?group=6&index=1&page=1&address=&lt=0&at=0&order=0&q=&hashtag=&region=2&area=19"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {t.incentives.cta.button}
            </a>
            <a href="/contact" className="btn-secondary">
              {t.incentives.cta.contact}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
