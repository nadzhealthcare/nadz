/**
 * Send transactional email via Resend HTTP API (HTTPS :443).
 * https://resend.com/docs/api-reference/emails/send-email
 */

const RESEND_URL = 'https://api.resend.com/emails';

export async function sendMailViaResend({
  to,
  fromEmail,
  fromName = 'NADZ Healthcare',
  replyTo,
  subject,
  text,
  html,
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set');
  }
  if (!fromEmail) {
    throw new Error('RESEND_FROM_EMAIL is not set');
  }

  const from =
    fromName && fromName.trim()
      ? `${fromName.trim()} <${fromEmail}>`
      : fromEmail;

  const body = {
    from,
    to: [to],
    subject,
    html,
    text,
  };

  if (replyTo) {
    body.reply_to = replyTo;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const res = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    const data = await res.json().catch(() => ({}));

    if ((res.status === 200 || res.status === 201) && data.id) {
      return { messageId: data.id };
    }

    const detail = typeof data === 'object' && data !== null ? JSON.stringify(data) : String(data);
    const err = new Error(`Resend error ${res.status}: ${detail}`);
    err.statusCode = res.status;
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

export function isResendConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
}
