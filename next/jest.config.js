module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/lib/gsap$": "<rootDir>/__mocks__/libGsap.ts",
    "^@/(.*)$": "<rootDir>/$1",
  },
  testMatch: ["**/*.test.tsx", "**/*.test.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
};
