import { defineConfig } from 'vite';
import { resolve } from 'path';

// Custom domain (tabithabrown.com) serves from the root, so base is '/'.
export default defineConfig({
  root: '.',
  base: '/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        v3: resolve(__dirname, 'v3.html'),
        aboutMe: resolve(__dirname, 'about-me.html'),
        events: resolve(__dirname, 'events.html'),
        press: resolve(__dirname, 'press.html'),
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
