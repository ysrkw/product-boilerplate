// @ts-check

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

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
})
