import { DotenvConfigOutput, config } from 'dotenv';
import { resolve } from 'path';

export const envPath = (envFileName: string): string => resolve(process.cwd(), envFileName);

export const loadDotEnv = (envFileName: string): DotenvConfigOutput => config({ path: envPath(envFileName) });
