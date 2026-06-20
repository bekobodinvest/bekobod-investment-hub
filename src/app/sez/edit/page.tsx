import { notFound } from 'next/navigation';
import SezZoneEditor from '@/components/SezZoneEditor';

// Dev-only SEZ zone editor. Hidden (404) in production builds.
export default function SezEditorPage() {
  if (process.env.NODE_ENV === 'production') notFound();

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="container-custom">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1a2744]">
            СЭЗ — 8 та кластер таҳрирлагич
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Зонани танлаб оқ нуқталарни тортинг, ёки зонани бутун кўчиринг. Сақлаш{' '}
            <code>sezZones.coords.json</code> ёзади. Faqat dev rejimida.
          </p>
        </div>
        <SezZoneEditor />
      </div>
    </main>
  );
}
