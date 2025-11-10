import { EntityTarget } from 'typeorm';

export interface SeedingMetadata<TEntity> {
  entity: EntityTarget<TEntity>;
  customSave?: (data: TEntity[]) => Promise<void>;
}
