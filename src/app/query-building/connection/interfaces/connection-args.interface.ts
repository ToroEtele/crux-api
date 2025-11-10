import { IPaginationArgs } from '../../pagination/interfaces/pagination-args.interface';
import { ConnectionFilter } from '../filtering/interfaces/connection-filter.interface';
import { ISort } from '../../sorting/interfaces/sort.interface';

export interface IConnectionArgs<TEntity = any> extends IPaginationArgs {
  filter?: ConnectionFilter<TEntity> | null;
  orderBy?: ISort[] | null;
}
