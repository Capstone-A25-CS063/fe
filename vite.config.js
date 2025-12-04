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
  // 🧩 Tambahkan properti resolve/alias
  resolve: {
    alias: {
      // Menetapkan '@' sebagai alias untuk direktori './src'
      '@': path.resolve(__dirname, './src'), 
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor libraries into separate chunks
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor-react';
            }
            if (id.includes('recharts')) {
              return 'vendor-recharts';
            }
            if (id.includes('axios')) {
              return 'vendor-axios';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-lucide';
            }
            return 'vendor-others';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
})