/** Default chat entry point stored in CMS / JSON (WhatsApp resolves this to api.whatsapp.com). */
export const DEFAULT_WHATSAPP_CHAT_URL = 'https://wa.me/971521597336';

/** Tailwind lg breakpoint — desktop opens WhatsApp web without wa.me redirect hop */
const DESKTOP_WHATSAPP_MEDIA = '(min-width: 1024px)';

/**
 * On desktop, rewrite wa.me links to api.whatsapp.com so the browser does not hit wa.me first.
 * Mobile/tablet keeps wa.me for consistent app handoff.
 *
 * @param {string} [url]
 * @returns {string}
 */
export function resolveWhatsAppOpenUrl(url = DEFAULT_WHATSAPP_CHAT_URL) {
  if (!url || typeof window === 'undefined') return url;

  let desktop = false;
  try {
    desktop = window.matchMedia(DESKTOP_WHATSAPP_MEDIA).matches;
  } catch {
    desktop = window.innerWidth >= 1024;
  }
  if (!desktop) return url;

  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');
    if (host !== 'wa.me') return url;

    const phone = u.pathname.replace(/^\//, '').replace(/\D/g, '');
    if (!phone) return url;

    const out = new URL('https://api.whatsapp.com/send');
    out.searchParams.set('phone', phone);
    const text = u.searchParams.get('text');
    if (text) out.searchParams.set('text', text);
    return out.toString();
  } catch {
    return url;
  }
}

/**
 * @param {string} [url]
 */
export function openWhatsAppUrl(url = DEFAULT_WHATSAPP_CHAT_URL) {
  if (typeof window === 'undefined') return;
  window.open(resolveWhatsAppOpenUrl(url), '_blank', 'noopener,noreferrer');
}
