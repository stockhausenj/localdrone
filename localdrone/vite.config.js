import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    cors: { origin: "*" },
    proxy: {
      "/api/get-users": {
        target: "https://localdrone.io",
        changeOrigin: true,
      },
    },
  }
})
