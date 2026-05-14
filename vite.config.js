import { defineConfig } from 'vite';
import { resolve } from 'path';

// Base path is required because GitHub Pages serves this repo from
// https://taylormadecreative.github.io/tabitha-brown-site/  (NOT the root).
// Without this, Vite rewrites asset src to /assets/... which 404s in prod.
export default defineConfig({
  root: '.',
  base: '/tabitha-brown-site/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        v2: resolve(__dirname, 'v2.html'),
        notFound: resolve(__dirname, '404.html'),
      },
    },
    assetsInlineLimit: 4096,
    cssCodeSplit: false,
  },
  server: {
    port: 5173,
    host: true,
  },
});
