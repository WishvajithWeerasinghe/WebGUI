import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    vueJsx(),
    vueDevTools(),
  ],


  server: {
      // 1. Force the watcher to use polling if standard events fail
      watch: {
        usePolling: true,
        interval: 100, // Check for changes every 100ms
      },
      // 2. Ensure the HMR connection is stable
      hmr: {
        overlay: true, // Shows errors in the browser overlay
      }
    },


  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
