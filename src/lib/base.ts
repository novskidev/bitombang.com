// Prefix internal links with Astro's base path so GitHub Pages (subpath) and
// the real domain (root) both work without touching call sites twice.
export const withBase = (path: string) =>
  (import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + path.replace(/^\//, '')).replace(/\/{2,}/g, '/');
