import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

// Dev-only endpoint: persists edited SEZ lot zones + perimeters back to JSON.
// Disabled in production so the live site can never be modified through it.
export async function POST(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Disabled in production' }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const data = (body as { data?: unknown })?.data;
  if (!data || typeof data !== 'object') {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }

  const ZONES = new Set([
    'metallurgy',
    'pharma',
    'machinery',
    'building',
    'logistics',
    'food',
    'energy',
    'textile',
  ]);

  for (const [key, raw] of Object.entries(data as Record<string, unknown>)) {
    const entry = raw as { zone?: unknown; points?: unknown } | null;
    if (!entry || typeof entry !== 'object') {
      return NextResponse.json({ error: `Bad entry "${key}"` }, { status: 400 });
    }
    if (typeof entry.zone !== 'string' || !ZONES.has(entry.zone)) {
      return NextResponse.json({ error: `Bad zone for "${key}"` }, { status: 400 });
    }
    const pts = entry.points;
    if (
      !Array.isArray(pts) ||
      !pts.every(
        (p) =>
          Array.isArray(p) &&
          p.length === 2 &&
          typeof p[0] === 'number' &&
          typeof p[1] === 'number'
      )
    ) {
      return NextResponse.json(
        { error: `Bad points for "${key}"` },
        { status: 400 }
      );
    }
  }

  const file = path.join(process.cwd(), 'src', 'data', 'sezLots.data.json');
  await writeFile(file, JSON.stringify(data, null, 0), 'utf8');

  return NextResponse.json({ ok: true, lots: Object.keys(data).length });
}
