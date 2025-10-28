import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  base: process.env.NODE_ENV === 'production' ? '/Vehicle-Gate-Pass/' : '',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  define: {
    __API_URL__: JSON.stringify(
      process.env.NODE_ENV === 'production'
        ? 'https://app.asiagroup1999.co.th/app/'
        : 'http://192.168.1.8/asiagroup_app/'
    ),

    __IMG_ICON__: JSON.stringify(
      process.env.NODE_ENV === 'production'
        ? '/Vehicle-Gate-Pass/'
        : '/'
    ),

  }
})
