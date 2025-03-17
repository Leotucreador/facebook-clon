import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    sourcemap: false,
    outDir: 'dist', // asegúrate que sea 'dist' como mencionaste
  },
  base: '/',
});
