'use client';

import { DEFAULT_WHATSAPP_CHAT_URL, resolveWhatsAppOpenUrl } from '@/lib/whatsapp';

/**
 * Server-rendered pages can use this for WhatsApp anchors so desktop skips wa.me redirect.
 */
export function WhatsAppExternalLink({
  href = DEFAULT_WHATSAPP_CHAT_URL,
  children,
  className,
  ...rest
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
      onClick={(e) => {
        e.preventDefault();
        window.open(resolveWhatsAppOpenUrl(href), '_blank', 'noopener,noreferrer');
      }}
    >
      {children}
    </a>
  );
}
