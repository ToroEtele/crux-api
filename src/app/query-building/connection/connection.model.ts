import { IPageInfo } from '../pagination/interfaces/page-info.interface';

import { IConnection } from './interfaces/connection.interface';

export class ConnectionModel<TEntity> implements IConnection<TEntity> {
  public readonly edges: TEntity[];
  public readonly pageInfo: IPageInfo;
  public readonly totalCount: number;

  constructor({ edges, pageInfo, totalCount }: { pageInfo: IPageInfo; totalCount: number; edges: TEntity[] }) {
    this.edges = edges;
    this.pageInfo = pageInfo;
    this.totalCount = totalCount;
  }

  public static empty<TEntity>(): ConnectionModel<TEntity> {
    return new ConnectionModel({ edges: [], pageInfo: this.emptyPageInfo(), totalCount: 0 });
  }

  public static emptyPageInfo(): IPageInfo {
    return { hasNextPage: false, hasPreviousPage: false, startOffset: 0, endOffset: 0 };
  }
}
