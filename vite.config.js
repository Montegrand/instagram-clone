import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src'),
      '@app': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src/app'),
      '@pages': path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        'src/pages',
      ),
      '@components': path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        'src/components',
      ),
      '@styles': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src/styles'),
      '@services': path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        'src/services',
      ),
      '@store': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src/store'),
      '@hooks': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src/hooks'),
      '@features': path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        'src/features',
      ),
      '@assets': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src/assets'),
    },
  },
})
