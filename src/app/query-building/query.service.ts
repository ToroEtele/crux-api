import { isEmpty } from 'lodash';

import { ConnectionFilter } from './connection/filtering/interfaces/connection-filter.interface';
import { ConnectionService } from './connection/connection.service';
import { ConnectionModel } from './connection/connection.model';

import { IPaginationArgs } from './pagination/interfaces/pagination-args.interface';
import { IQueryBuilder } from './interfaces/query-builder.interface';
import { ISort } from './sorting/interfaces/sort.interface';

export class QueryService<TEntity> {
  constructor(public readonly query: IQueryBuilder<TEntity>) {}

  public apply(filter: ConnectionFilter<TEntity> | null = {}, sort: ISort[] | null = []): IQueryBuilder<TEntity> {
    this.applyFilter(filter).applySorting(sort);
    return this.query;
  }

  public applyFilter(filter: ConnectionFilter<TEntity> | null = {}): this {
    if (!filter || isEmpty(filter)) return this;

    this.query.andWhere(filter);
    return this;
  }

  public applySorting(sort: ISort[] | null = []): this {
    if (!sort || isEmpty(sort)) return this;

    sort.forEach(({ field, direction }) => {
      this.query.addOrderBy(field, direction);
    });

    return this;
  }

  public async getConnection(paginationArgs: IPaginationArgs, requestedFields: string[]): Promise<ConnectionModel<TEntity>> {
    const connectionService = new ConnectionService({ requestedFields, paginationArgs, query: this.query });
    return await connectionService.getConnection();
  }
}
