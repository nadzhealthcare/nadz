import { DEFAULT_WHATSAPP_CHAT_URL } from '@/lib/whatsapp';

export const DEFAULT_PHONE_TEL = 'tel:+97180046239';

/** @param {string} [phone] E.164 or local digits */
export function normalizeTelHref(phone) {
  if (!phone) return DEFAULT_PHONE_TEL;
  const raw = String(phone).trim();
  if (raw.startsWith('tel:')) return raw;
  const cleaned = raw.replace(/[^\d+]/g, '');
  if (!cleaned) return DEFAULT_PHONE_TEL;
  return `tel:${cleaned.startsWith('+') ? cleaned : `+${cleaned}`}`;
}

/** @param {string} [url] */
export function normalizeWhatsAppHref(url) {
  const trimmed = url && String(url).trim();
  return trimmed || DEFAULT_WHATSAPP_CHAT_URL;
}

/**
 * SEO-friendly WhatsApp CTA — real href for crawlers, opens in new tab.
 * @param {object} props
 * @param {string} [props.href]
 * @param {string} [props.className]
 * @param {string} [props['aria-label']]
 * @param {React.ReactNode} props.children
 */
export function WhatsAppCtaLink({ href, className, children, 'aria-label': ariaLabel }) {
  return (
    <a
      href={normalizeWhatsAppHref(href)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

/**
 * SEO-friendly phone CTA — tel: link for crawlers and assistive tech.
 * @param {object} props
 * @param {string} [props.href] Phone number or tel: URI
 * @param {string} [props.className]
 * @param {string} [props['aria-label']]
 * @param {React.ReactNode} props.children
 */
export function PhoneCtaLink({ href, className, children, 'aria-label': ariaLabel }) {
  return (
    <a href={normalizeTelHref(href)} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
