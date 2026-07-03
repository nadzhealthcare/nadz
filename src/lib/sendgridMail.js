/**
 * Send transactional email via SendGrid HTTP API (port 443).
 * Use when outbound SMTP is blocked (e.g. some cloud hosts).
 * Docs: https://docs.sendgrid.com/api-reference/mail-send/mail-send
 */

const SEND_URL = 'https://api.sendgrid.com/v3/mail/send';

export async function sendMailViaSendGrid({
  to,
  fromEmail,
  fromName = 'NADZ Healthcare',
  replyTo,
  subject,
  text,
  html,
}) {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    throw new Error('SENDGRID_API_KEY is not set');
  }
  if (!fromEmail) {
    throw new Error('SENDGRID_FROM_EMAIL is not set');
  }

  const body = {
    personalizations: [
      {
        to: [{ email: to }],
        subject,
      },
    ],
    from: { email: fromEmail, name: fromName },
    content: [
      { type: 'text/plain', value: text },
      { type: 'text/html', value: html },
    ],
  };

  if (replyTo) {
    body.reply_to = { email: replyTo };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const res = await fetch(SEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (res.status === 202 || res.status === 200) {
      return { messageId: res.headers.get('x-message-id') || undefined };
    }

    let detail = '';
    try {
      const errJson = await res.json();
      detail = JSON.stringify(errJson);
    } catch {
      detail = await res.text();
    }
    const err = new Error(`SendGrid error ${res.status}: ${detail}`);
    err.statusCode = res.status;
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

export function isSendGridConfigured() {
  return Boolean(process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL);
}
