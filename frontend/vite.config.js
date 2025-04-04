import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://m-catena-app.vercel.app",
        changeOrigin: true,
        secure: false,
        ws: true, // ✅ Enable WebSockets (optional)
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true", // ✅ Allow credentials
        },
      },
    },
  },
})
