import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Replace with your backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite '/api' to ''
      },
    },
  },
  build: {
    outDir: 'dist', // Ensure the output directory is set for Vercel
    emptyOutDir: true, // Clear the output directory before building
  },
})
