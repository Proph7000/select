import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// eslint-disable-next-line custom/no-nested-relative-imports
import { baseRoute } from './src/shared/constants/route-names-paths'

const VENDOR_LIBS = ['/react/', '/react-dom/', '/react-router-dom/']

export default defineConfig({
  base: baseRoute,
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  build: {
    sourcemap: process.env.VITE_APP_DEVELOPMENT !== 'false',
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        manualChunks(id) {
          if (
            id.includes('node_modules') &&
            VENDOR_LIBS.some((lib) => id.includes(lib))
          ) {
            return 'vendor'
          }
        },
      },
    },
  },
  server: {
    host: true,
  },
  resolve: {
    alias: {
      '@app': `${path.resolve(__dirname, './src/app/')}`,
      '@pages': `${path.resolve(__dirname, './src/pages/')}`,
      '@widgets': `${path.resolve(__dirname, './src/widgets/')}`,
      '@features': `${path.resolve(__dirname, './src/features/')}`,
      '@entities': `${path.resolve(__dirname, './src/entities/')}`,
      '@shared': `${path.resolve(__dirname, './src/shared/')}`,
    },
  },
})
