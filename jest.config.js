module.exports = {
  "collectCoverage": true,
  "rootDir": "./",
  "testRegex": "__tests__/.+\\.test\\.js",
  "transform": {
    '^.+\\.js?$': "babel-jest"
  },
  "moduleFileExtensions": ["js"],
  "moduleDirectories": [
    "node_modules",
    "lib"
  ]
}