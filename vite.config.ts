import { URL, fileURLToPath } from "url"

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5174,
    proxy: {
      '^/api/.*': {
        target: "https://127.0.0.1:2999/liveclientdata",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace('/api', ''),
      },
      "/test": {
        target: 'http://jsonplaceholder.typicode.com/todos/1',
        changeOrigin: true
      }
    }
  },
  build: {
    commonjsOptions: { transformMixedEsModules: true }
  },
  define: {
    "import.meta.env.NODE_TLS_REJECT_UNAUTHORIZED": "0"
  },
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '#', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
    ],
  }
})
