import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

// Dev-only endpoint: persists edited lot perimeters back to the coords JSON.
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

  const coords = (body as { coords?: unknown })?.coords;
  if (!coords || typeof coords !== 'object') {
    return NextResponse.json({ error: 'Missing coords' }, { status: 400 });
  }

  // Validate shape: { [key]: [[number, number], ...] }
  for (const [key, pts] of Object.entries(coords as Record<string, unknown>)) {
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

  const file = path.join(process.cwd(), 'src', 'data', 'yangiLots.coords.json');
  await writeFile(file, JSON.stringify(coords, null, 0), 'utf8');

  return NextResponse.json({ ok: true, lots: Object.keys(coords).length });
}
