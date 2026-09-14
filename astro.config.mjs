import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// SITE_URL/BASE_PATH di-override oleh workflow GitHub Pages saat preview sementara.
// Build normal (Netlify/CF Pages/Vercel nanti) pakai default domain asli, tanpa base path.
export default defineConfig({
  site: process.env.SITE_URL || 'https://bitombang.com',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  vite: { plugins: [tailwindcss()] },
});
