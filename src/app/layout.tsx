import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Bekobod Investment Hub | Official Investment Portal',
  description:
    'Official investment portal for Bekobod district. Discover investment opportunities in Bekobod SEZ, Oybek Free Trade Zone, and Yangi O\'zbekiston residential district.',
  keywords:
    'Bekobod, investment, SEZ, special economic zone, Uzbekistan, e-auction, tax incentives',
  openGraph: {
    title: 'Bekobod Investment Hub',
    description: 'Your Gateway to Central Asia\'s Most Dynamic Investment Zone',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
