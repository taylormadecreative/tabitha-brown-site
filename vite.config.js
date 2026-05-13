import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
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
