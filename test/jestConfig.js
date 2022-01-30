/* eslint-disable @typescript-eslint/no-var-requires */

'use strict'

const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '..')

/**
 * @returns {import('@jest/types').Config.InitialOptions}
 */
exports.createJestConfig = (
  /** @type {import('@jest/types').Config.InitialOptions} */
  config = {}
) => {
  const {setupFiles = [], ...restConfig} = config

  return {
    ...restConfig,
    globalSetup: path.resolve(__dirname, './globalSetup.ts'),
    globalTeardown: path.resolve(__dirname, './globalTeardown.ts'),
    moduleNameMapper: {
      ...restConfig.moduleNameMapper,
      '^@sanity/(.*)$': path.resolve(ROOT_PATH, 'packages/@sanity/$1/src'),
      '^\\$test$': path.resolve(ROOT_PATH, 'test'),
    },
    setupFiles: [...setupFiles],
    testEnvironment: 'jsdom',
    // - match all files in `__tests__` directories
    // - match files ending with `.test.js`, `.test.ts`, `.test.jsx`, or `.test.tsx`
    testRegex: '(/__tests__/.*|\\.test)\\.[jt]sx?$',
    testTimeout: 30000,
    transform: {'^.+\\.tsx?$': ['esbuild-jest', {sourcemap: true}]},
  }
}
