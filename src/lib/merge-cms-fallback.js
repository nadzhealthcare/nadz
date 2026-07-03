/**
 * When Strapi returned data, only use fallback for keys Strapi did not send (undefined).
 * Do not replace null/empty CMS values with bundled JSON — that made CMS edits look "reverted".
 *
 * @param {object | null | undefined} cms
 * @param {object | null | undefined} fallback
 * @returns {object}
 */
export function mergeCmsWithFallback(cms, fallback) {
  if (!cms || typeof cms !== 'object') {
    return fallback && typeof fallback === 'object' ? { ...fallback } : {};
  }
  if (!fallback || typeof fallback !== 'object') {
    return { ...cms };
  }

  const merged = { ...fallback, ...cms };
  for (const key of Object.keys(fallback)) {
    if (cms[key] === undefined) {
      merged[key] = fallback[key];
    }
  }
  return merged;
}
