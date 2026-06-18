import { notFound } from 'next/navigation';
import LotMapEditor from '@/components/LotMapEditor';

// Dev-only lot perimeter editor. Hidden (404) in production builds.
export default function LotEditorPage() {
  if (process.env.NODE_ENV === 'production') notFound();

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="container-custom">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1a2744]">
            Lot perimeter editor
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Drag a lot to move it, drag its white points to reshape, then press
            <span className="font-semibold"> Save all perimeters</span>. Changes
            write to <code>yangiLots.coords.json</code>. Dev only.
          </p>
        </div>
        <LotMapEditor />
      </div>
    </main>
  );
}
