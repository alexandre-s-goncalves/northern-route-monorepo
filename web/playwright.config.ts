import { defineConfig, devices } from '@playwright/test';

const isCI =
  typeof process !== 'undefined' && !!process.env && !!process.env.CI;

const projects = isCI
  ? [
      {
        name: 'chromium-desktop',
        use: { ...devices['Desktop Chrome'] },
      },
    ]
  : [
      {
        name: 'chromium-desktop',
        use: { ...devices['Desktop Chrome'] },
      },
      {
        name: 'webkit-desktop',
        use: { ...devices['Desktop Safari'] },
      },
      {
        name: 'mobile-iphone',
        use: { ...devices['iPhone 14'] },
      },
      {
        name: 'mobile-android',
        use: { ...devices['Pixel 7'] },
      },
    ];

export default defineConfig({
  testDir: './E2E',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : '100%',
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },
  projects,
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: !isCI,
  },
});
