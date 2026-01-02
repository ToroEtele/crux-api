import { IPaginationArgs } from '../../pagination/interfaces/pagination-args.interface';
import { ConnectionFilter } from '../filtering/interfaces/connection-filter.interface';
import { ISort } from '../../sorting/interfaces/sort.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IConnectionArgs<TEntity = any> extends IPaginationArgs {
  filter?: ConnectionFilter<TEntity> | null;
  orderBy?: ISort[] | null;
}
