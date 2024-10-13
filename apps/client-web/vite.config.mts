import type { UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default {
  plugins: [react()],
  server: {
    port: 3000,
  },
} satisfies UserConfig
