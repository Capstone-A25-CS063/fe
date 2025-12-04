// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), 
    },
  },
  build: {
    minify: 'esbuild',
    target: 'ES2020',
    rollupOptions: {
      output: {
        // Use explicit manualChunks object for better clarity
        manualChunks: {
          // React core + DOM (keep tightly coupled)
          'vendor-react': ['react', 'react-dom'],
          // Large charting library
          'vendor-recharts': ['recharts'],
          // HTTP client
          'vendor-axios': ['axios'],
          // Icon library
          'vendor-lucide': ['lucide-react'],
        },
      }
    },
    chunkSizeWarningLimit: 1000,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  // Pre-bundle important dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios', 'recharts', 'lucide-react'],
  },
})