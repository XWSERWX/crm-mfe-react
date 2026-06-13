module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
  testMatch: [
    '**/packages/**/__tests__/**/*.test.{ts,tsx,js,jsx}',
  ],
  moduleNameMapper: {
    '^(auth|clients|deals)/.*$': '<rootDir>/packages/crm-root/src/__tests__/__mocks__/mfeMock.tsx',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverageFrom: [
    'packages/*/src/**/*.{ts,tsx}',
    '!packages/*/src/__tests__/**',
  ],
};
