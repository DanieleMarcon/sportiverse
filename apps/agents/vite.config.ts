import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    host: true
  },
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '@ui': '../packages/ui/src',
      '@remi': '../packages/remi/src',
      '@common': '../packages/common/src'
    }
  }
})