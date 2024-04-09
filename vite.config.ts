import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://tddd96-g11-blhub.github.io/website/',
  plugins: [react()],
})
