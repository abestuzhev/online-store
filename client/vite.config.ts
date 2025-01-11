import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import envCompatible from 'vite-plugin-env-compatible';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) };


  return {
    // base:
    //   mode === 'development'
    //     ? '/services/insurance'
    //     : '/local/modules/nota.insurance/app/insurance/dist/',
    build: {
      // chunkSizeWarningLimit: 1000,
      // sourcemap: false,
      rollupOptions: {
        external: ['vite/dynamic-import-polyfill'],
        // input: { main, index: './src/index.tsx' },
        // input: {
        //   main,
        //   index: './src/index.tsx',
        // },
        // output: {
        //   entryFileNames: '[name].[hash].js',
        // },
      },
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        '@images': path.resolve(__dirname, 'src/assets/images'),
      },
    },

    server: {
      // watch: {
      //   usePolling: process.env.VITE_DEV_SERVER_POLLING === 'true',
      // },
      // https: true,
      // hmr: { protocol: 'wss', host: 'localhost' },
      // strictPort: true,
      port: 5000,
      cors: true,
      // proxy: {
      //   '/apiTest/': {
      //     target: 'https://test.smbn.ru/',
      //     changeOrigin: true,
      //     secure: false,
      //     auth: 'msp:notamedia',
      //     rewrite: (path) => path.replace(/^\/apiTest/, ''),
      //   },
      // },
    },
    define: {
      'process.env': env
    },
    plugins: [
      react(),
      envCompatible({
        prefix: 'REACT_APP',
      }),
      // mkcert(),
      viteTsconfigPaths(),
      // alias({
      //   entries: [{ find: '$', replacement: '/src/' }],
      // }),
      // mode === 'development' && absolutifyPaths(),
      // mode === 'development' && remoteDev(),
    ],
    // esbuild: {
    //   jsxInject: `import React from 'react'`,
    // },
  };
});
