module.exports = {
  "globals": { "ts-jest": { "tsConfig": "../../tsconfig.json" } },
  "moduleFileExtensions": ["ts", "tsx", "js"],
  "testEnvironment": "node",
  "testMatch": ["<rootDir>/test/**/*.(js|ts|tsx)"],
  "transform": { "^.+\\.tsx?$": "ts-jest" },
  "transformIgnorePatterns": ["/node_modules/"]
}
