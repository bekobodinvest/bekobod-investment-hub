'use client';

import { useEffect, useState } from 'react';
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

export default function ContactPage() {
  const { t } = useLanguage();
  useScrollAnimation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    interest: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('request failed');
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#1a2744] to-[#243660] relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#4a9c4e]/10 blur-3xl" />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl">
            <span className="green-badge mb-5">{t.contact.heroBadge}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              {t.contact.title}
            </h1>
            <p className="text-xl text-[#4a9c4e] font-medium">{t.contact.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left: Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Director Card */}
              <div className="animate-on-scroll card p-8 border border-gray-100">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1a2744] to-[#243660] flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-[#1a2744] text-lg">{t.contact.director.name}</div>
                    <div className="text-gray-500 text-sm">{t.contact.director.role}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2 font-medium">
                  {t.contact.director.company}
                </div>
              </div>

              {/* Office Card */}
              <div className="animate-on-scroll card p-8 border border-gray-100">
                <h3 className="font-bold text-[#1a2744] text-lg mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {t.contact.office.title}
                </h3>
                <div className="space-y-1.5">
                  <p className="text-gray-600 font-medium">{t.contact.office.address}</p>
                  <p className="text-gray-500">{t.contact.office.city}</p>
                  <p className="text-gray-500">{t.contact.office.country}</p>
                </div>
              </div>

              {/* E-Auction Card */}
              <div className="animate-on-scroll bg-gradient-to-br from-[#1a2744] to-[#243660] rounded-[2rem] p-8">
                <div className="w-12 h-12 rounded-xl bg-[#4a9c4e]/20 flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{t.contact.eauction.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-5">
                  {t.contact.eauction.description}
                </p>
                <a
                  href="https://e-auksion.uz/lots?group=6&index=1&page=1&address=&lt=0&at=0&order=0&q=&hashtag=&region=2&area=19"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#4a9c4e] hover:bg-[#3a7d3e] text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-200 shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {t.contact.eauction.button}
                </a>
                <div className="mt-3 text-gray-400 text-xs">{t.contact.eauction.website}</div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <div className="animate-on-scroll card p-8 md:p-10 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#1a2744] mb-7">{t.contact.form.title}</h2>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-5">
                      <svg className="w-10 h-10 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#1a2744] mb-2">{t.contact.messageSent}</h3>
                    <p className="text-gray-500">{t.contact.form.success}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t.contact.form.name}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4a9c4e] focus:ring-2 focus:ring-[#4a9c4e]/20 outline-none transition-all text-sm"
                          placeholder={t.contact.form.namePlaceholder}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t.contact.form.email}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4a9c4e] focus:ring-2 focus:ring-[#4a9c4e]/20 outline-none transition-all text-sm"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t.contact.form.phone}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4a9c4e] focus:ring-2 focus:ring-[#4a9c4e]/20 outline-none transition-all text-sm"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t.contact.form.country}
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4a9c4e] focus:ring-2 focus:ring-[#4a9c4e]/20 outline-none transition-all text-sm"
                          placeholder={t.contact.form.countryPlaceholder}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.contact.form.interest}
                      </label>
                      <select
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4a9c4e] focus:ring-2 focus:ring-[#4a9c4e]/20 outline-none transition-all text-sm bg-white"
                      >
                        <option value="">{t.contact.form.selectPlaceholder}</option>
                        {t.contact.form.interestOptions.map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.contact.form.message}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4a9c4e] focus:ring-2 focus:ring-[#4a9c4e]/20 outline-none transition-all text-sm resize-none"
                        placeholder={t.contact.form.messagePlaceholder}
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-600 font-medium">{t.contact.form.error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full btn-primary justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      {sending ? t.contact.form.sending : t.contact.form.submit}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment projects quick links */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h3 className="text-center font-bold text-[#1a2744] text-2xl mb-8 animate-on-scroll">
            {t.contact.exploreProjects}
          </h3>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { href: '/sez', title: t.nav.sez, color: 'from-[#1a2744] to-[#243660]' },
              { href: '/oybek-ftz', title: t.nav.oybek, color: 'from-[#1a3a2a] to-[#243660]' },
              { href: '/yangi-uzbekistan', title: t.nav.yangi, color: 'from-[#243660] to-[#1a2744]' },
            ].map((project, i) => (
              <a
                key={i}
                href={project.href}
                className={`animate-on-scroll block bg-gradient-to-br ${project.color} rounded-[2rem] p-6 text-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="font-bold text-lg mb-1">{project.title}</div>
                <div className="text-[#4a9c4e] text-sm font-medium">{t.contact.projectCards[i].subtitle}</div>
                <div className="mt-4 flex items-center gap-1 text-gray-300 text-sm">
                  {t.home.directions.learnMore}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
