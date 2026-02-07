import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  optimizeDeps: { include: ['react/jsx-dev-runtime'] },
  test: {
    globals: true,
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [
        { browser: 'chromium' },
        { browser: 'firefox' },
        { browser: 'webkit' },
      ],
    },
    include: ['__tests__/**/*.test.ts?(x)'],
    exclude: ['__tests__/options/trim.test.ts'],
  },
});
