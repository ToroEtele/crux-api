import { NextFunction, Response, Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { WinstonLoggerFactory } from '../factory/winston.factory';
import { LogLevel } from '../constants/log-level.enum';
import { RequestContext } from '../../interfaces/extended-request.interface';

const NS_TO_MS = BigInt(1e6);

const getDurationInMilliseconds = (start: bigint): bigint => {
  const diff = process.hrtime.bigint() - start;
  return diff / NS_TO_MS;
};

export const RequestLoggerMiddleware = (req: Request & RequestContext, res: Response, next: NextFunction): void => {
  req.requestId = uuidv4();

  if (req.body?.operationName && req.body.operationName === 'IntrospectionQuery') {
    return next();
  }

  const rid = req.requestId;
  const start = process.hrtime.bigint();

  const WinstonLogger = new WinstonLoggerFactory();
  const logger = WinstonLogger.buildSTDOutLogger();

  logger.log(LogLevel.DEBUG, `REQUEST: ${rid} ${req.ip}, STARTED`);

  res.on('close', () => {
    const durationInMilliseconds = getDurationInMilliseconds(start);
    logger.log(LogLevel.DEBUG, `${rid} - ${durationInMilliseconds}ms CLOSED`);
  });

  next();
};
