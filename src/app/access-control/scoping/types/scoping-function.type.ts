import { ObjectLiteral } from 'typeorm';

import { IRequesterAuthContext } from '@common/interfaces/requester-context.interface';
import { IQueryBuilder } from '@query-building/interfaces/query-builder.interface';

export type ScopingFunction<TEntity extends ObjectLiteral> = (query: IQueryBuilder<TEntity>, authContext: IRequesterAuthContext) => IQueryBuilder<TEntity>;
