import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'http',
    setupFiles: ['./test/network-guard.ts'],
  },
});
