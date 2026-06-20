import { notFound } from 'next/navigation';
import { SEZ_ZONES } from '@/data/sezZones';
import SezClusterDetail from '@/components/SezClusterDetail';

export function generateStaticParams() {
  return SEZ_ZONES.map((z) => ({ zone: z.id }));
}

export default async function ClusterPage({
  params,
}: {
  params: Promise<{ zone: string }>;
}) {
  const { zone } = await params;
  const found = SEZ_ZONES.find((z) => z.id === zone);
  if (!found) notFound();

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="container-custom">
        <SezClusterDetail zoneId={found.id} />
      </div>
    </main>
  );
}
