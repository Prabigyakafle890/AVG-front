import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import compression from 'vite-plugin-compression';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const allowedHosts = env.VITE_ALLOWED_HOSTS
    ? env.VITE_ALLOWED_HOSTS.split(',')
    : [];

  return {
    plugins: [
      react(),
      svgr(),
      compression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 0,
        deleteOriginFile: false,
        filter: /\.(js|css|html|svg)$/i,
      }),
      compression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 0,
        deleteOriginFile: false,
        filter: /\.(js|css|html|svg)$/i,
      }),
    ],
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src') },
    },
    build: {
      rollupOptions: {
        output: {
          minifyInternalExports: true,
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            tanstack: ['@tanstack/react-query'],
            state: ['zustand'],
            http: ['axios'],
          },
        },
      },
    },
    preview: {
      allowedHosts,
    },
  };
});
