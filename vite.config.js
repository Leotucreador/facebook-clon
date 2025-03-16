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
  base: '/', // ESTA LÍNEA ES CLAVE para que Vercel no rompa las rutas
})
