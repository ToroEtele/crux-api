import type { LogLevel } from '../constants/log-level.enum';

export interface ILogLevelMethod {
  (level: LogLevel, msgOrObj: Error | Record<string, unknown> | string): void
  (level: LogLevel, msg: string, ...interpolationArgs: any[]): void
  (
    level: LogLevel,
    obj: Error | Record<string, unknown>,
    msg: string,
    ...interpolationArgs: any[]
  ): void
}
