import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    cors: { origin: "*" },
    proxy: {
      "/api/users": {
        target: "https://localdrone.io",
        changeOrigin: true,
      },
      "/api/auth": {
        target: "https://localdrone.io",
        changeOrigin: true,
      },
    },
  }
})
