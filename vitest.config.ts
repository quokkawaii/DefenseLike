import { defineConfig } from 'vitest/config';

// SYS-074: Unit·Integration Test는 Vitest로 실행
export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts', 'tests/integration/**/*.test.ts'],
  },
});
