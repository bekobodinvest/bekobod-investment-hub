'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
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

export default function AboutPage() {
  const { t } = useLanguage();
  useScrollAnimation();

  const newsImages = [
    '/news/wanyang-1.jpg',
    '/news/wanyang-2.jpg',
    '/news/wanyang-3.jpg',
    '/news/wanyang-4.jpg',
  ];

  // News photo carousel: one slide at a time, auto-advances every 5s.
  const [newsIndex, setNewsIndex] = useState(0);
  const newsCount = newsImages.length;
  const goNews = (dir: number) => setNewsIndex((i) => (i + dir + newsCount) % newsCount);
  useEffect(() => {
    const id = setInterval(() => setNewsIndex((i) => (i + 1) % newsCount), 5000);
    return () => clearInterval(id);
  }, [newsIndex, newsCount]);

  const permitIcons = [
    // Legal entity registration
    <svg key="p0" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    // Land rights
    <svg key="p1" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    // Urban planning
    <svg key="p2" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    // Environmental
    <svg key="p3" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    // Construction permit
    <svg key="p4" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    // Utility connections
    <svg key="p5" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    // Sectoral licences
    <svg key="p6" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
    // Customs
    <svg key="p7" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
    // Work permits
    <svg key="p8" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c0 1.306.834 2.417 2 2.83M9 14a3.001 3.001 0 00-2.83 2M15 11a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.834 2.83 2M9 17a3 3 0 016 0" /></svg>,
  ];

  const valueIcons = [
    <svg key={0} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
    <svg key={1} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    <svg key={2} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    <svg key={3} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#1a2744] to-[#243660] relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#4a9c4e]/10 blur-3xl" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="navy-badge mb-5 border border-white/20">{t.about.hero.badge}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              {t.about.title}
            </h1>
            <p className="text-xl text-[#4a9c4e] font-medium mb-4">{t.about.subtitle}</p>
            <p className="text-gray-300 text-lg leading-relaxed">{t.about.hero.description}</p>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <div className="accent-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-6">
                {t.about.company.title}
              </h2>
              <div className="flex items-center gap-3 mb-6 p-4 bg-[#e8f5e9] rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#4a9c4e]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-[#1a2744] text-sm">{t.about.company.name}</div>
                  <div className="text-[#4a9c4e] text-xs font-medium">{t.about.company.authority}</div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">{t.about.company.description}</p>
            </div>

            <div className="animate-on-scroll">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                <Image
                  src="/Bekobod_SEZ.png"
                  alt="Bekabad Investment Hub"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2744]/70 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-white">
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <Image src="/Asset_7.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <div>
                      <div className="font-bold">BEKOBOD</div>
                      <div className="text-[#4a9c4e] text-sm font-medium">INVESTMENT HUB</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10 animate-on-scroll">
            <h2 className="section-heading">{t.about.news.title}</h2>
            <div className="accent-line mx-auto mt-4" />
            <p className="text-gray-500 mt-6 max-w-2xl mx-auto">{t.about.news.subtitle}</p>
          </div>
        </div>

        {/* Photo carousel — one large slide, side buttons, auto-advance every 5s */}
        <div className="container-custom">
          <div className="relative max-w-4xl mx-auto mb-12">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg bg-gray-100">
              {newsImages.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={`${t.about.news.post.title} — ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  priority={i === 0}
                  className={`object-cover transition-opacity duration-700 ${
                    i === newsIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}

              {/* Prev / Next */}
              <button
                type="button"
                onClick={() => goNews(-1)}
                aria-label="Oldingi"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-[#1a2744] shadow-md transition-colors hover:bg-white"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => goNews(1)}
                aria-label="Keyingi"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-[#1a2744] shadow-md transition-colors hover:bg-white"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots */}
            <div className="mt-5 flex justify-center gap-2">
              {newsImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setNewsIndex(i)}
                  aria-label={`Slayd ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === newsIndex ? 'w-7 bg-[#4a9c4e]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Article text */}
        <div className="container-custom">
          <div className="max-w-4xl mx-auto animate-on-scroll">
            <span className="inline-block px-3 py-1 rounded-full bg-[#e8f5e9] text-[#4a9c4e] text-xs font-semibold mb-4">
              {t.about.news.post.date}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-[#1a2744] mb-5 leading-snug">
              {t.about.news.post.title}
            </h3>
            <div className="space-y-4">
              {t.about.news.post.body.map((p, i) => (
                <p key={i} className="text-gray-600 leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Director */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="section-heading">{t.about.director.title}</h2>
            <div className="accent-line mx-auto mt-4" />
          </div>

          <div className="max-w-4xl mx-auto animate-on-scroll">
            <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-5">
                {/* Director photo placeholder */}
                <div className="md:col-span-2 bg-gradient-to-br from-[#1a2744] to-[#243660] flex flex-col items-center justify-center p-10 gap-5">
                  <div className="w-28 h-28 rounded-full bg-[#4a9c4e]/20 border-4 border-[#4a9c4e]/30 flex items-center justify-center">
                    <svg className="w-14 h-14 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-bold text-lg">{t.about.director.name}</div>
                    <div className="text-[#4a9c4e] text-sm mt-1">{t.about.director.role}</div>
                  </div>
                </div>

                {/* Message */}
                <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                  <svg className="w-10 h-10 text-[#4a9c4e]/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-600 leading-relaxed text-lg italic">{t.about.director.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="animate-on-scroll bg-gradient-to-br from-[#1a2744] to-[#243660] rounded-[2rem] p-8 md:p-10">
              <div className="w-14 h-14 rounded-2xl bg-[#4a9c4e]/20 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t.about.mission.title}</h3>
              <p className="text-gray-300 leading-relaxed">{t.about.mission.description}</p>
            </div>

            {/* Vision */}
            <div className="animate-on-scroll bg-[#e8f5e9] rounded-[2rem] p-8 md:p-10 border border-[#4a9c4e]/20">
              <div className="w-14 h-14 rounded-2xl bg-[#4a9c4e] flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1a2744] mb-4">{t.about.vision.title}</h3>
              <p className="text-gray-600 leading-relaxed">{t.about.vision.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Permits & Approvals */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14 animate-on-scroll">
            <h2 className="section-heading">{t.about.permits.title}</h2>
            <div className="accent-line mx-auto mt-4" />
            <p className="text-gray-500 mt-6 max-w-2xl mx-auto">{t.about.permits.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {t.about.permits.items.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll flex gap-4 p-6 rounded-[2rem] border border-gray-100 bg-gray-50 hover:border-[#4a9c4e]/40 hover:bg-[#e8f5e9]/40 transition-all duration-200"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-[#e8f5e9] flex items-center justify-center flex-shrink-0 text-[#4a9c4e]">
                  {permitIcons[i]}
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a2744] mb-1 text-sm leading-snug">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="animate-on-scroll bg-gradient-to-r from-[#1a2744] to-[#243660] rounded-[2rem] p-6 md:p-8 flex gap-5 items-start">
            <div className="w-12 h-12 rounded-xl bg-[#4a9c4e]/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">{t.about.permits.note}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14 animate-on-scroll">
            <h2 className="section-heading">{t.about.values.title}</h2>
            <div className="accent-line mx-auto mt-4" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.about.values.items.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll card p-7 text-center border border-gray-100"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#e8f5e9] flex items-center justify-center mx-auto mb-4 text-[#4a9c4e]">
                  {valueIcons[i]}
                </div>
                <h3 className="font-bold text-[#1a2744] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
