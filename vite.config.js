import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import purgecss from 'vite-plugin-purgecss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    purgecss({
      content: ['./src/**/*.jsx', './src/**/*.js', './index.html'],
      safelist: ['active', 'show', 'fade', 'collapse', 'modal', 'dropdown', 'tooltip', 'popover'], // Keep Bootstrap dynamic classes
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['framer-motion', 'bootstrap'],
        },
      },
    },
  },
    server: {
    proxy: {
      '/api': {
        target: 'http://13.203.198.111:3000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
