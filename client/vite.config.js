import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':'http://localhost:3031',
      '/auth':'http://localhost:3031',
    }
  },
  plugins: [react()],
})
