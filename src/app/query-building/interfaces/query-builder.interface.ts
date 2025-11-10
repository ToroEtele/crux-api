import { PromiseMaybe } from '@common/base-types/maybe.type';
import { ConnectionFilter } from '@query-building/connection/filtering/interfaces/connection-filter.interface';
import { OrderDirection } from '../sorting/constants/order-direction.enum';

export interface IQueryBuilder<TEntity> {
  skip(skip?: number): this;
  take(take?: number): this;

  getOne(): PromiseMaybe<TEntity>;
  getMany(): Promise<TEntity[]>;
  getCount(): Promise<number>;
  getManyAndCount(): Promise<[TEntity[], number]>;

  whereInIds(ids: number[] | string[]): this;
  where(filter: ConnectionFilter<TEntity>): this;
  andWhere(filter: ConnectionFilter<TEntity>): this;
  orWhere(filter: ConnectionFilter<TEntity>): this;

  orderBy(): this;
  orderBy(sort: string, order: OrderDirection): this;
  addOrderBy(sort: string, order: OrderDirection): this;

  getSql(): string;
}
