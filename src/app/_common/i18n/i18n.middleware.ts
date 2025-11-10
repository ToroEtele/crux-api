import languageParser from 'accept-language-parser';
import { NextFunction, Response } from 'express';

import { RequestContext } from '../interfaces/extended-request.interface';

import { GraphLocale } from './types';

export const I18nMiddleware = (req: RequestContext, _res: Response, next: NextFunction): void => {
  const graphLocale = <GraphLocale | undefined>req.get('x-locale');
  if (graphLocale && Object.values(GraphLocale).includes(graphLocale)) {
    req.locale = graphLocale;
  } else {
    const parsedLocale = languageParser.pick(Object.values(GraphLocale), req.get('accept-language') ?? '', {
      loose: true
    });
    req.locale = parsedLocale ?? GraphLocale.English;
  }
  next();
};
