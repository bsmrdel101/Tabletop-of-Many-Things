/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  test: {
    dir: './src/tests/unit'
  }
});
