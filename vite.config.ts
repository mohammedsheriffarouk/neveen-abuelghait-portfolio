import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' keeps every asset path relative, so the build runs from any folder or static host.
export default defineConfig({
  plugins: [react()],
  base: './',
});
