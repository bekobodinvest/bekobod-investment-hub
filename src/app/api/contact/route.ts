import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Receives contact-form submissions and emails them to the inbox.
// Sends via Zoho SMTP using the info@bekobodinvest.uz mailbox.
export const runtime = 'nodejs';

const RECIPIENT = process.env.CONTACT_TO || 'info@bekobodinvest.uz';

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const name = String(data.name ?? '').trim();
  const email = String(data.email ?? '').trim();
  const phone = String(data.phone ?? '').trim();
  const country = String(data.country ?? '').trim();
  const interest = String(data.interest ?? '').trim();
  const message = String(data.message ?? '').trim();

  // Required fields (match the form's `required` inputs)
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  // Length guards to avoid abuse
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: 'Field too long' }, { status: 400 });
  }

  const rows: [string, string][] = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone || '—'],
    ['Country', country || '—'],
    ['Interest', interest || '—'],
  ];

  const user = process.env.ZOHO_MAIL_USER;
  const pass = process.env.ZOHO_MAIL_PASS;
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const tgChat = process.env.TELEGRAM_CHAT_ID;

  if ((!user || !pass) && (!tgToken || !tgChat)) {
    console.error('contact: no delivery channel configured (email or telegram)');
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }

  let emailOk = false;
  let telegramOk = false;

  // --- Email via Zoho SMTP (best-effort) ---
  if (user && pass) {
    const html = `
      <h2>New contact request — bekobodinvest.uz</h2>
      <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="font-weight:600;color:#1a2744">${k}</td><td>${escapeHtml(v)}</td></tr>`
          )
          .join('')}
      </table>
      <p style="font-family:sans-serif;font-size:14px"><strong>Message:</strong><br/>${escapeHtml(
        message
      ).replace(/\n/g, '<br/>')}</p>
    `;
    const text = `New contact request — bekobodinvest.uz
${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}

Message:
${message}`;

    const transporter = nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
      port: Number(process.env.ZOHO_SMTP_PORT || 465),
      secure: true, // SSL on port 465
      auth: { user, pass },
    });
    try {
      await transporter.sendMail({
        from: `"Bekobod Investment Hub" <${user}>`, // must be the authenticated mailbox
        to: RECIPIENT,
        replyTo: `"${name}" <${email}>`, // reply goes straight to the visitor
        subject: `New inquiry from ${name}${interest ? ` — ${interest}` : ''}`,
        text,
        html,
      });
      emailOk = true;
    } catch (err) {
      console.error('contact: sendMail failed', err);
    }
  }

  // --- Telegram bot (best-effort) ---
  if (tgToken && tgChat) {
    const tgText = `<b>📩 New contact request — bekobodinvest.uz</b>\n\n${rows
      .map(([k, v]) => `<b>${k}:</b> ${escapeHtml(v)}`)
      .join('\n')}\n\n<b>Message:</b>\n${escapeHtml(message)}`;
    try {
      const res = await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgChat,
          text: tgText,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      });
      if (res.ok) telegramOk = true;
      else console.error('contact: telegram sendMessage failed', res.status, await res.text());
    } catch (err) {
      console.error('contact: telegram request failed', err);
    }
  }

  if (!emailOk && !telegramOk) {
    return NextResponse.json({ error: 'Send failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true, emailOk, telegramOk });
}
