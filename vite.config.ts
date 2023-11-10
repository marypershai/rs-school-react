import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      components: path.resolve(__dirname, './src/components'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
