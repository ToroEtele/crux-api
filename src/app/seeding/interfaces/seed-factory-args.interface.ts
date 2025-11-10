import { EntityManager, EntityTarget } from 'typeorm';

export interface SeedFactoryArgs<TEntity> {
  name: string;
  entityManager: EntityManager;
  customSave?: (data: TEntity[]) => Promise<void>;
  entityClass: EntityTarget<TEntity>;
  data: TEntity[];
}
