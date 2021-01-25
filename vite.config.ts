import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [vue(), viteTsConfigPaths()],
})
