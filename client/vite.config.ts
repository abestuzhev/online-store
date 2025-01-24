import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import envCompatible from 'vite-plugin-env-compatible';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    build: {
      rollupOptions: {
        external: ['vite/dynamic-import-polyfill'],
      },
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        '@images': path.resolve(__dirname, 'src/assets/images'),
      },
    },

    server: {
      port: 5000,
      cors: true,
    },
    define: {
      'process.env': env
    },
    plugins: [
      react(),
      envCompatible({
        prefix: 'REACT_APP',
      }),
      viteTsconfigPaths(),
    ],
  };
});
