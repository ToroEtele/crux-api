import 'winston-daily-rotate-file';
import winston from 'winston';

import { config } from '../../config/config.service';

import type { ILogger } from '../interfaces/logger.interface';

export class WinstonLoggerFactory {
  private readonly transports: winston.transport[] = [
    new winston.transports.DailyRotateFile({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A'
        }),
        winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
      ),
      filename: 'logs/%DATE%.log',
      maxSize: '20m',
      maxFiles: '7d',
      datePattern: 'YYYY-MM-DD'
    })
  ];

  constructor() {
    if (config.environment === 'development') {
      this.transports.push(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD hh:mm:ss.SSS A'
            }),
            winston.format.printf((info) => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`)
          )
        })
      );
    }
  }

  public buildSTDOutLogger(): ILogger {
    return winston.createLogger({
      level: config.logLevel,
      levels: winston.config.npm.levels,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD hh:mm:ss A'
        }),
        winston.format.printf((info) => `[${info.timestamp}] ${info.message}`)
      ),
      transports: this.transports
    });
  }
}
