module.exports = {
  "clearMocks": true,
  "coverageDirectory": "coverage",
  "globals": { "ts-jest": { "tsConfig": "tsconfig.json" } },
  "moduleFileExtensions": [ "ts", "tsx", "js" ],
  "testEnvironment": "jest-environment-jsdom",
  "testURL": "http://localhost",
  "testEnvironmentOptions": {},
  "testPathIgnorePatterns": [
    "<rootDir>/packages/ali-oss"
  ],
  "testMatch": [
    "<rootDir>/packages/*/test/**/*.(js|ts|tsx)",
    "<rootDir>/packages/*/src/**/?(*.)(spec|test).(js|ts|tsx)"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "transformIgnorePatterns": [
    "/node_modules/"
  ]
}
