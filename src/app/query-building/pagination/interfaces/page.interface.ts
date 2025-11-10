import { IPageInfo } from './page-info.interface';

export interface IPage<TEntity> {
  edges: TEntity[];
  pageInfo: IPageInfo;
  totalCount: number;
}
