import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portfolio/', // Adjust this to match your repository name
  plugins: [react(), ],
})