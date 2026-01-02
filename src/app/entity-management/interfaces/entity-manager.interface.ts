import { IQueryBuilder } from '@query-building/interfaces/query-builder.interface';
import { Constructable } from '@common/base-types/constructable.type';

export interface IEntityManager {
  createQueryBuilder<TEntity extends object>(entityClass: Constructable<TEntity>, alias?: string | null): IQueryBuilder<TEntity>;

  create<TEntity extends object>(entityClass: Constructable<TEntity>, plainObject?: Partial<TEntity>): TEntity;

  remove<TEntity extends object>(entity: TEntity): Promise<TEntity>;

  update<TEntity extends object>(entityClass: Constructable<TEntity>, entity: TEntity, partialEntity: Partial<TEntity>): Promise<TEntity>;

  save<TEntity extends object>(entity: TEntity): Promise<TEntity>;

  saveMany<TEntity extends object>(entities: TEntity[]): Promise<TEntity[]>;
}
