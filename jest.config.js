const { createConfig } = require('@openedx/frontend-base/config');

module.exports = createConfig('test', {
  setupFilesAfterEnv: [
    'jest-expect-message',
    '<rootDir>/src/setupTest.jsx',
  ],
  coveragePathIgnorePatterns: [
    'src/segment.js',
    'src/postcss.config.js',
    'testUtils', // don't unit test jest mocking tools
    'src/data/services/lms/fakeData', // don't unit test mock data
    'src/test', // don't unit test integration test utils
    'src/__mocks__',
  ],
  moduleNameMapper: {
    // Asset mocks
    '\\.svg$': '<rootDir>/src/__mocks__/svg.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/file.js',
    // App aliases
    '^hooks$': '<rootDir>/src/hooks',
    '^testUtils$': '<rootDir>/src/testUtils.js',
    '^data/constants/app$': '<rootDir>/src/data/constants/app.js',
    '^data/constants/requests$': '<rootDir>/src/data/constants/requests.js',
    '^data/services/lms/api$': '<rootDir>/src/data/services/lms/api.js',
    '^data/services/lms/utils$': '<rootDir>/src/data/services/lms/utils.js',
    '^data/services/lms/urls$': '<rootDir>/src/data/services/lms/urls.js',
    '^data/redux/hooks$': '<rootDir>/src/data/redux/hooks/index.js',
    '^data/redux/app/reducer$': '<rootDir>/src/data/redux/app/reducer.js',
    '^data/redux$': '<rootDir>/src/data/redux/index.js',
    '^utils$': '<rootDir>/src/utils/index.js',
    '^utils/hooks$': '<rootDir>/src/utils/hooks.js',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^containers/(.*)$': '<rootDir>/src/containers/$1',
    '^tracking$': '<rootDir>/src/tracking/index.js',
  },
  testTimeout: 120000,
});
