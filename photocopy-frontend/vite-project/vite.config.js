import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
       
        target: 'https://printease1-dnw1.onrender.com', // Your backend URL
        changeOrigin: true,  // Ensures the request is proxied correctly
        secure: true,       // Set to true if you're using HTTPS
      },
    },
  },
});
