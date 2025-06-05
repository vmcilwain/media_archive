module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  testMatch: [
    "<rootDir>/app/javascript/**/__tests__/**/*.(ts|tsx|js)",
    "<rootDir>/app/javascript/**/*.(test|spec).(ts|tsx|js)"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  collectCoverageFrom: [
    "app/javascript/**/*.{ts,tsx}",
    "!app/javascript/**/*.d.ts"
  ]
};
