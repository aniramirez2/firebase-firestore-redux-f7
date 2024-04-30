module.exports = {
  preset: undefined,
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    // process `*.tsx` files with `ts-jest`
  },
};
