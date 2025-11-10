import { ConnectionFilterOperator } from '../constants/connection-filter-operator.enum';

import { IConnectionFilterInput } from './connection-filter-input.interface';

export type ConnectionFilterBase<TEntity = any> = {
  [TField in keyof TEntity]?: IConnectionFilterInput<TEntity[TField]>;
};

export type ConnectionFilter<TEntity = any> = ConnectionFilterBase<TEntity> & {
  [ConnectionFilterOperator.or]?: Array<ConnectionFilter<TEntity>>;
  [ConnectionFilterOperator.and]?: Array<ConnectionFilter<TEntity>>;
};
