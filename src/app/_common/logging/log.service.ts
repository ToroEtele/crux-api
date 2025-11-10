import { Inject, Service } from 'typedi';

import { ILogger } from './interfaces/logger.interface';
import { LoggerToken } from './logger/winston.logger';
import { LogLevel } from './constants/log-level.enum';

import type { ILogMethod } from './interfaces/log-method.interface';

@Service({ global: true })
export class LogService {
  constructor(@Inject(LoggerToken) private readonly logger: ILogger) {}

  public silly: ILogMethod = (...[msgOrObj, ...args]: any[]) => {
    this.logger.log(LogLevel.SILLY, msgOrObj, ...args);
  };

  public debug: ILogMethod = (...[msgOrObj, ...args]: any[]) => {
    this.logger.log(LogLevel.DEBUG, msgOrObj, ...args);
  };

  public http: ILogMethod = (...[msgOrObj, ...args]: any[]) => {
    this.logger.log(LogLevel.HTTP, msgOrObj, ...args);
  };

  public info: ILogMethod = (...[msgOrObj, ...args]: any[]) => {
    this.logger.log(LogLevel.INFO, msgOrObj, ...args);
  };

  public warn: ILogMethod = (...[msgOrObj, ...args]: any[]) => {
    this.logger.log(LogLevel.WARN, msgOrObj, ...args);
  };

  public error: ILogMethod = (...[msgOrObj, ...args]: any[]) => {
    this.logger.log(LogLevel.ERROR, msgOrObj, ...args);
  };
}
