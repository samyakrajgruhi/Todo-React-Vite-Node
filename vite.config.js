import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // Allows external access (for phone preview)
    watch: {
      usePolling: true,
      interval: 100, // Reduce polling interval
    }
  },
  plugins: [react()],
})
