import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:'/view/' ,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // find: /^~(.*)$/,
      // replacement: 'node_modules/$1',
    }
  },
  build: {
    outDir:'dist',
    rollupOptions: {
      output: {
        // 入口文件名
        entryFileNames: 'assets/[name].js',
        // 块文件名
        chunkFileNames: 'assets/[name]-[hash].js',
        // 资源文件名 css 图片等等
        assetFileNames: 'assets/[name]-[hash]-balabala.[ext]',
      },
    },
  }
})
