import { config as nextJsConfig } from '@repo/lint-config/next-js';

export default [
  ...nextJsConfig,
  {
    rules: {
      // 禁用一些常见的ESLint规则
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'turbo/no-undeclared-env-vars': 'off',
    },
  },
];
