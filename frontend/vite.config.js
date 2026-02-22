import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Directs any request starting with /auth to the Auth Service
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      // Directs any request starting with /api/users (or similar) to the User Service
      '/api/users': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
        // Optional: remove /api from the path before sending to the backend
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})