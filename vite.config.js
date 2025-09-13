import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages, set base to '/binary-octal-hex-calc/'
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/binary-octal-hex-calc/'
})
