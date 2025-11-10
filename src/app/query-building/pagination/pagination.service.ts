import { IQueryBuilder } from '../interfaces/query-builder.interface';
import { IPaginationArgs } from './interfaces/pagination-args.interface';
import { IPage } from './interfaces/page.interface';

export class PaginationService<TEntity> {
  public take: number;
  public skip: number;

  constructor(params: IPaginationArgs) {
    this.take = params.take || 10;
    this.skip = params.skip || 0;
  }

  public async getPage(query: IQueryBuilder<TEntity>): Promise<IPage<TEntity>> {
    query.take(this.take).skip(this.skip);

    const [edges, totalCount] = await query.getManyAndCount();

    return {
      edges,
      pageInfo: {
        hasNextPage: totalCount > this.take + this.skip,
        hasPreviousPage: this.skip > 0,
        startOffset: this.skip,
        endOffset: this.skip + edges.length
      },
      totalCount
    };
  }
}
