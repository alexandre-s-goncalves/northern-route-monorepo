import {defineConfig, mergeConfig} from 'vitest/config';

export default mergeConfig(
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'E2E/**',
        '**/.{idea,git,cache,output,temp}/**',
      ],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html', 'lcov'],
        exclude: [
          'node_modules/',
          'src/test/',
          '**/index.ts',
          'src/main.tsx',
          'src/vite-env.d.ts',
          '**/*.test.{ts,tsx}',
          'src/assets/**',
          'E2E/**',
        ],
      },
    },
  }),
);
