import { Service, Token } from 'typedi';
import winston from 'winston';

import { WinstonLoggerFactory } from '../factory/winston.factory';

import type { ILogLevelMethod } from '../interfaces/log-level-method.interface';
import type { ILogger } from '../interfaces/logger.interface';
import type { LogLevel } from '../constants/log-level.enum';

export const LoggerToken = new Token<ILogger>();

@Service({
  id: LoggerToken,
  global: true,
  factory: [WinstonLoggerFactory, 'buildSTDOutLogger']
})
export class WinstonLogger implements ILogger {
  constructor(private readonly provider: winston.Logger) {}

  public log: ILogLevelMethod = (level: LogLevel, ...[msgOrObj, ...args]: any[]): void => {
    this.provider[level](msgOrObj, ...args);
  };
}
