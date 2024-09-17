import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Define manual chunks for libraries or components
          // Example:
          // vendor: ['react', 'react-dom'],
        }
      }
    },
    chunkSizeWarningLimit: 1000, 
  }
})
