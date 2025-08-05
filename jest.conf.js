const { pathsToModuleNameMapper } = require('ts-jest');

const {
  compilerOptions: { paths = {}, baseUrl = './' },
} = require('./tsconfig.json');

module.exports = {
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|dayjs/esm|keycloak-js)'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        isolatedModules: true,
      },
    ],
  },
  resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
  roots: ['<rootDir>', `<rootDir>/${baseUrl}`],
  modulePaths: [`<rootDir>/${baseUrl}`],
  cacheDirectory: '<rootDir>/target/jest-cache',
  coverageDirectory: '<rootDir>/target/test-results/',
  collectCoverageFrom: [
    'src/main/webapp/app/**/*.{ts,js}',
    '!src/main/webapp/app/**/*.spec.{ts,js}',
    '!src/main/webapp/app/**/index.ts',
    '!src/main/webapp/environments/**',
    '!src/main/webapp/main.ts',
    '!src/main/webapp/test.ts'
  ],
  coverageReporters: ['html', 'text-summary', 'lcov', 'clover'],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: `<rootDir>/${baseUrl}/` }),
  testEnvironmentOptions: {
    url: 'https://jestjs.io',
  },
  testMatch: ['<rootDir>/src/main/webapp/environments/**/@(*.)@(spec.ts)', '<rootDir>/src/main/webapp/app/**/@(*.)@(spec.ts)'],
  testResultsProcessor: 'jest-sonar-reporter',
};
