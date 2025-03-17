import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    sourcemap: false,
  },
  base: '/',
  server: {
    port: 5173, // Cambia si lo necesitas
    hmr: {
      protocol: 'ws',       // usa 'ws' para HTTP, 'wss' si usas HTTPS
      host: 'localhost',    // o tu IP si accedes desde otro dispositivo
      port: 5173,           // asegúrate que esté libre
    },
  },
})
