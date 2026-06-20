import { notFound } from 'next/navigation';
import SezLotEditor from '@/components/SezLotEditor';

// Dev-only SEZ lot editor (120 lots). Hidden (404) in production builds.
export default function SezLotEditorPage() {
  if (process.env.NODE_ENV === 'production') notFound();

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="container-custom">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1a2744]">
            СЭЗ — 120 лот таҳрирлагич
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Барча 120 лот юқори ўнг бурчакда «стаклаб» туради. Зонани танлаб
            лотларни ўз ўрнига кўчиринг, кераклисини қайта рангга (кластерга)
            ўтказинг. Сақлаш{' '}
            <code>sezLots.data.json</code> ёзади. Faqat dev rejimida.
          </p>
        </div>
        <SezLotEditor />
      </div>
    </main>
  );
}
