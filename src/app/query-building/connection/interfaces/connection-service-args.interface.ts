import { IQueryBuilder } from '../../interfaces/query-builder.interface';
import { IPaginationArgs } from '../../pagination/interfaces/pagination-args.interface';

export interface IConnectionServiceArgs<T> {
  query: IQueryBuilder<T>;
  paginationArgs: IPaginationArgs;
  requestedFields: string[];
}
