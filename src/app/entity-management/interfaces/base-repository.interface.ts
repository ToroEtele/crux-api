import { PromiseMaybe } from '../../_common/base-types/maybe.type';
import { IQueryBuilder } from '@query-building/interfaces/query-builder.interface';

export interface IBaseRepository<TEntity extends {}> {
  createQueryBuilder(): IQueryBuilder<TEntity>;

  findOne(id?: number | string): PromiseMaybe<TEntity>;
  findOneOrThrow(id?: number | string): Promise<TEntity>;

  buildAndSave(entity: Partial<TEntity>): Promise<TEntity>;
  build(entity?: Partial<TEntity>): TEntity;
  save(entity: TEntity): Promise<TEntity>;

  update(entity: TEntity, partialEntity: Partial<TEntity>): Promise<TEntity>;
}
