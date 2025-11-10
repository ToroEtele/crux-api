import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.json';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testMatch: ['**/*.integration.ts', '**/*.test.ts'],
  roots: ['<rootDir>/src'],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: '<rootDir>'
  }),
  setupFiles: ['reflect-metadata'],
  setupFilesAfterEnv: ['jest-extended/all']
};

export default config;
