'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/i18n/translations';

const E_AUCTION_URL =
  'https://e-auksion.uz/lots?group=6&index=1&page=1&address=&lt=0&at=0&order=0&q=&hashtag=&region=2&area=19';

const languages: { code: Language; label: string }[] = [
  { code: 'uz', label: 'UZ' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中' },
];

export default function Header() {
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/sez', label: t.nav.sez },
    { href: '/oybek-ftz', label: t.nav.oybek },
    { href: '/yangi-uzbekistan', label: t.nav.yangi },
    { href: '/incentives', label: t.nav.incentives },
    { href: '/contact', label: t.nav.contact },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1a2744] shadow-2xl py-3'
          : 'bg-[#1a2744]/95 backdrop-blur-md py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0 group">
          <Image
            src="/Logo_Bekobod.png"
            alt="Bekobod Investment Hub"
            height={55}
            width={200}
            className="h-[55px] w-auto object-contain group-hover:opacity-90 transition-opacity duration-200"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                isActive(link.href)
                  ? 'bg-[#4a9c4e] text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-gray-300 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {/* Globe icon */}
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span>{language.toUpperCase()}</span>
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                <div className="absolute right-0 mt-2 w-24 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20 animate-dropdown">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`w-full flex items-center justify-center px-4 py-2.5 text-sm font-semibold transition-colors ${
                        language === lang.code
                          ? 'bg-[#e8f5e9] text-[#4a9c4e]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* E-Auction CTA */}
          <a
            href={E_AUCTION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 bg-[#4a9c4e] hover:bg-[#3a7d3e] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap shadow-lg btn-glow"
          >
            {/* Auction gavel — matches the E-Auksion brand mark */}
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 1.8 L22.2 7.4 L18.6 13.8 L7.4 8.2 Z" />
              <path d="M10.4 6.5 L3.2 12.8 L6.6 15.6 L13.8 9.3 Z" />
              <rect x="2" y="18.4" width="20" height="3.2" rx="0.8" />
            </svg>
            </svg>
            {t.nav.eAuction}
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-[#111b30] border-t border-white/10 mt-3">
          <div className="container-custom py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? 'bg-[#4a9c4e] text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={E_AUCTION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 bg-[#4a9c4e] text-white font-semibold px-4 py-3 rounded-xl text-sm btn-glow"
            >
              {t.nav.eAuction}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
