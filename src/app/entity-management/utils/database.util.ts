/* eslint-disable new-cap */

import { Constructable } from '@/app/_common/base-types/constructable.type';
import { metadataManager, MetadataType } from '@common/metadata';
import { nonNullable } from '@common/utils/non-nullable.util';

import { BaseRepository } from '@entity-management/base-types/base.repository';
import { RepositoryFactory } from '@entity-management/base-types/repository-factory.type';
import { databaseRepositoryMap } from '@entity-management/mappings/databases-repository.mapping';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class DatabaseUtil {
  public static getRepository<TEntity extends {}>(entity: Constructable<TEntity>): BaseRepository<TEntity> {
    const repositoryFactory = this.getRepositoryFactory<TEntity>(entity);
    const repository = repositoryFactory(entity);
    if (repository instanceof BaseRepository) return repository;
    throw new Error(`Repository for ${entity.name} isn't of BaseRepository instance`);
  }

  public static getRepositoryFactory<TEntity extends {}>(entity: Constructable<TEntity>): RepositoryFactory {
    const database = nonNullable(metadataManager.fetchClassMetadata(entity, MetadataType.Entity).database);
    const repositoryFactory = databaseRepositoryMap.get(database);
    if (!repositoryFactory) throw new Error(`Missing repository factory for ${entity.name}`);
    return repositoryFactory;
  }
}
