import { LogLevel } from './log-level.enum';
import { TypeORMLogLevel } from './typeorm-log-level.enum';

export const typeORMLogLevelMap: {
  [TKey in TypeORMLogLevel]: LogLevel;
} = {
  [TypeORMLogLevel.LOG]: LogLevel.DEBUG,
  [TypeORMLogLevel.INFO]: LogLevel.INFO,
  [TypeORMLogLevel.WARN]: LogLevel.WARN
};
