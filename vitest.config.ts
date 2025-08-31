/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';


const plugins = [
  react(),
  tsconfigPaths()
];

export default defineConfig({
  plugins,
  test: {
    exclude: ['**/node_modules/**', '**/dist/**'],
    projects: [
      {
        plugins,
        test: {
          name: 'UNIT',
          include: ['./src/tests/unit/**/*.test.{ts,tsx}'],
        },
      },
      {
        plugins,
        test: {
          name: 'INTEGRATION',
          include: ['./src/tests/integration/**/*.test.{ts,tsx}'],
          globalSetup: './src/tests/globalSetup.ts',
        },
      },
    ],
  },
});