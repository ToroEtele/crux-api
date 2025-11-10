import { IPageInfo } from '../../pagination/interfaces/page-info.interface';

export interface IConnection<T> {
  edges: T[];
  pageInfo: IPageInfo;
  totalCount: number;
}
