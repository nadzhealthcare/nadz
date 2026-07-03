/**
 * Build an absolute canonical URL for Next.js metadata.
 * CMS may supply a full https URL or a root-relative path (e.g. /blog or /faq).
 *
 * @param {string | undefined | null} siteUrl - Primary site URL from Global (no trailing slash)
 * @param {string | undefined | null} explicitFromCms - Optional override from Strapi
 * @param {string} defaultPathname - Fallback path beginning with /
 * @returns {string}
 */
export function resolveCanonical(siteUrl, explicitFromCms, defaultPathname = '/') {
  const baseSite = String(siteUrl || 'https://nadzhealthcare.com').replace(/\/?$/, '');
  const v =
    explicitFromCms != null && String(explicitFromCms).trim() !== ''
      ? String(explicitFromCms).trim()
      : '';
  if (v) {
    if (/^https?:\/\//i.test(v)) {
      return v;
    }
    return `${baseSite}${v.startsWith('/') ? v : `/${v}`}`;
  }
  const p = defaultPathname && defaultPathname.length > 0 ? defaultPathname : '/';
  const pathNorm = p.startsWith('/') ? p : `/${p}`;
  return `${baseSite}${pathNorm}`;
}
