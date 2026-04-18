import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'   // ✅ এটা add করতে হবে

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()   // ✅ এখন কাজ করবে
  ],
})