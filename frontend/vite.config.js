import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5185,
    allowedHosts: ['profbrenojac.com.br'], // Libera o domínio da VPS
    proxy: {
      // Quando sua aplicação React fizer uma requisição para '/api',
      // o Vite vai encaminhá-la para 'http://localhost:8025'
      '/api': {
        target: 'http://devBackend-portalMamaloo:8025', // URL da sua API
        changeOrigin: true, // Importante para lidar com cabeçalhos de host
        // Se sua API **NÃO** espera o prefixo '/api' na URL,
        // descomente a linha abaixo para removê-lo antes de proxyar:
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})