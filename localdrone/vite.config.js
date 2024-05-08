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
        target: "http://localhost:8788",
        changeOrigin: true,
      },
      "/api/auth": {
        target: "http://localhost:8788",
        changeOrigin: true,
      },
    },
  }
})
