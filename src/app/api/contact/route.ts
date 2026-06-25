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

  const user = process.env.ZOHO_MAIL_USER;
  const pass = process.env.ZOHO_MAIL_PASS;
  if (!user || !pass) {
    console.error('contact: ZOHO_MAIL_USER / ZOHO_MAIL_PASS not configured');
    return NextResponse.json({ error: 'Mailer not configured' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
    port: Number(process.env.ZOHO_SMTP_PORT || 465),
    secure: true, // SSL on port 465
    auth: { user, pass },
  });

  const rows: [string, string][] = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone || '—'],
    ['Country', country || '—'],
    ['Interest', interest || '—'],
  ];
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

  try {
    await transporter.sendMail({
      from: `"Bekobod Investment Hub" <${user}>`, // must be the authenticated mailbox
      to: RECIPIENT,
      replyTo: `"${name}" <${email}>`, // reply goes straight to the visitor
      subject: `New inquiry from ${name}${interest ? ` — ${interest}` : ''}`,
      text,
      html,
    });
  } catch (err) {
    console.error('contact: sendMail failed', err);
    return NextResponse.json({ error: 'Send failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
