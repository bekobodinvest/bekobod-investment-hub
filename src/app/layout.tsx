import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import CursorGlow from '@/components/CursorGlow';

export const metadata: Metadata = {
  title: 'Bekabad Investment Hub | Official Investment Portal',
  description:
    'Official investment portal for Bekabad district. Discover investment opportunities in Bekabad SEZ, Oybek Free Trade Zone, and Yangi O\'zbekiston residential district.',
  keywords:
    'Bekabad, investment, SEZ, special economic zone, Uzbekistan, e-auction, tax incentives',
  openGraph: {
    title: 'Bekabad Investment Hub',
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
          <ChatAssistant />
          <CursorGlow />
        </LanguageProvider>
      </body>
    </html>
  );
}
