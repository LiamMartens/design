module.exports = {
  transform: {'^.+\\.tsx?$': 'esbuild-jest'},
  testEnvironment: 'jsdom',
  // - match all files in `__tests__` directories
  // - match files ending with `.test.ts`
  testRegex: '(/__tests__/.*|\\.test)\\.ts$',
  modulePathIgnorePatterns: ['<rootDir>/lib/'],
}
