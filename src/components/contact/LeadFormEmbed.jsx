'use client';

import { useEffect } from 'react';

const SCRIPT_ATTR = 'data-nadz-leadform-script';

/** Parse name="value", name='value', name=value, and boolean name tokens from a script open tag. */
function parseScriptAttrString(attrString) {
  const attributes = {};
  const re = /([a-zA-Z][\w:.-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>/]+)))?/g;
  let m;
  while ((m = re.exec(attrString)) !== null) {
    const name = m[1];
    attributes[name] = m[2] ?? m[3] ?? m[4] ?? '';
  }
  return attributes;
}

function parseEmbedScript(raw) {
  const trimmed = raw?.trim();
  if (!trimmed) return null;

  if (/^https?:\/\//i.test(trimmed)) {
    return { src: trimmed, attributes: {} };
  }

  const html = /<script\b/i.test(trimmed) ? trimmed : `<script ${trimmed}></script>`;

  if (typeof DOMParser !== 'undefined') {
    const el = new DOMParser().parseFromString(html, 'text/html').querySelector('script');
    if (el) {
      const src = el.getAttribute('src')?.trim();
      if (src && /^https?:\/\//i.test(src)) {
        const attributes = {};
        for (const attr of el.attributes) {
          if (attr.name === 'src') continue;
          attributes[attr.name] = attr.value;
        }
        return { src, attributes };
      }
    }
  }

  const tagMatch = trimmed.match(/<script\b([^>]*)>/i);
  const attrSource = tagMatch ? tagMatch[1] : trimmed;
  const srcMatch =
    attrSource.match(/\bsrc\s*=\s*["']([^"']+)["']/i) ||
    attrSource.match(/\bsrc\s*=\s*([^\s>]+)/i);
  if (!srcMatch) return null;

  const src = srcMatch[1];
  if (!/^https?:\/\//i.test(src)) return null;

  const attributes = parseScriptAttrString(attrSource);
  delete attributes.src;
  return { src, attributes };
}

function applyScriptAttributes(script, attributes) {
  for (const [name, value] of Object.entries(attributes)) {
    const lower = name.toLowerCase();
    if (lower === 'async') {
      script.async = true;
    } else if (lower === 'defer') {
      script.defer = true;
    } else if (lower === 'type' && value) {
      script.type = value;
    } else if (lower === 'crossorigin') {
      script.crossOrigin = value || 'anonymous';
    } else if (lower === 'integrity' && value) {
      script.integrity = value;
    } else if (lower === 'nonce' && value) {
      script.nonce = value;
    } else {
      script.setAttribute(name, value);
    }
  }
}

export function LeadFormEmbed({ title, fallbackMessage, embedScript }) {
  useEffect(() => {
    const parsed = parseEmbedScript(embedScript);
    if (!parsed?.src) return;

    if (document.querySelector(`script[${SCRIPT_ATTR}]`)) return;

    const script = document.createElement('script');
    script.src = parsed.src;
    script.setAttribute(SCRIPT_ATTR, 'true');
    applyScriptAttributes(script, parsed.attributes);
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [embedScript]);

  return (
    <div className="w-full">
      {title ? (
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary-dark mb-6 text-center">
          {title}
        </h2>
      ) : null}
      <div
        id="nadz-leadform"
        className="min-h-[120px] rounded-[14px] border border-gray-100 bg-white p-6 shadow-sm"
      >
        {fallbackMessage || null}
      </div>
    </div>
  );
}
