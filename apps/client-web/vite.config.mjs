// @ts-check

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  clearScreen: false,
  plugins: [react()],
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001/',
      },
    },
  },
  test: {
    css: true,
    environment: 'happy-dom',
    globals: true,
    setupFiles: './src/setup-tests.ts',
  },
})
