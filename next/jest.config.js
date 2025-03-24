module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^gsap/all$": "<rootDir>/__mocks__/gsapAllMock.js",
    "^gsap/ScrollTrigger$": "<rootDir>/__mocks__/gsapAllMock.js"
  },
  transformIgnorePatterns: ["/node_modules/(?!(gsap)/)"],
  testMatch: ["**/*.test.tsx", "**/*.test.ts"]
};
