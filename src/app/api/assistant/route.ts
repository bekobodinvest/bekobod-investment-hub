import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ASSISTANT_KNOWLEDGE } from '@/data/assistantKnowledge';

// AI assistant for site visitors. Answers questions about Bekabad SEZ,
// Oybek FTZ, Yangi O'zbekiston, tax incentives, and how to invest — using
// only the curated knowledge base in src/data/assistantKnowledge.ts.
export const runtime = 'nodejs';

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

// Cap how much conversation we accept, to bound cost and abuse.
const MAX_MESSAGES = 12;
const MAX_CHARS = 2000;

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const SYSTEM_PROMPT = `You are the official virtual assistant for the Bekabad Investment Hub website.

Your job: answer visitor questions about investing in Bekabad (the Special Economic Zone, Oybek Free Trade Zone, the Yangi O'zbekiston district, tax incentives, and the investment process).

Rules:
- Answer ONLY using the knowledge base below. If the answer is not in it, say you don't have that information and suggest the visitor use the Contact page. Never invent facts, figures, dates, or legal articles.
- Reply in the SAME language the visitor used (Uzbek, Russian, English, or Chinese).
- Be concise, friendly, and professional. Use short paragraphs or bullet points.
- You are not a lawyer or financial advisor — for binding details, refer visitors to official channels / the Contact page.
- Do not discuss anything unrelated to Bekabad investment. Politely redirect off-topic questions.

=== KNOWLEDGE BASE ===
${ASSISTANT_KNOWLEDGE}
=== END KNOWLEDGE BASE ===`;

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('assistant: OPENAI_API_KEY not configured');
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const rawMessages = Array.isArray(data.messages) ? data.messages : null;
  if (!rawMessages || rawMessages.length === 0) {
    return NextResponse.json({ error: 'Missing messages' }, { status: 400 });
  }

  // Validate and normalize the conversation history.
  const history: ChatMessage[] = [];
  for (const m of rawMessages.slice(-MAX_MESSAGES)) {
    const msg = m as Record<string, unknown>;
    const role = msg.role === 'assistant' ? 'assistant' : 'user';
    const content = String(msg.content ?? '').trim().slice(0, MAX_CHARS);
    if (content) history.push({ role, content });
  }
  if (history.length === 0 || history[history.length - 1].role !== 'user') {
    return NextResponse.json({ error: 'Invalid conversation' }, { status: 400 });
  }

  const openai = new OpenAI({ apiKey });

  try {
    const completion = await openai.chat.completions.create({
      model: MODEL,
      temperature: 0.3,
      max_tokens: 600,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    if (!reply) {
      return NextResponse.json({ error: 'Empty response' }, { status: 502 });
    }
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('assistant: OpenAI request failed', err);
    return NextResponse.json({ error: 'Assistant unavailable' }, { status: 502 });
  }
}
