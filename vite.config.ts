import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
//   envDir: './environment',
  plugins: [react()],
//   test: {
//     globals: true,
//     environment: 'happy-dom',
//     setupFiles: './src/cypress/e2eTests/loginPage.ts'
//   },
  server: {
    port: 3000,
    open: false, 
    proxy: {
        '/graphql': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
    }
  }
});