import jestConfig from "./jest.config";

import type { Config } from "jest";

const config: Config = {
  ...jestConfig,
  collectCoverage: false,
  testMatch: ["<rootDir>/src/**/*.integration.ts"],
};

export default config;
