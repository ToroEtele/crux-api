import { RepositoryFactory } from '@entity-management/base-types/repository-factory.type';
import { Database } from '../constants/database.enum';
import { BaseSqlRepository } from '../external-providers/typeorm/base-sql.repository';
import { typeormDataSourcesMap } from '../external-providers/typeorm/maps/typeorm-data-sources-map';
import { TypeORMEntityManager } from '../external-providers/typeorm/typeorm-entity-manager.adapter';

// function getElasticSearchRepositoryFactory(): RepositoryFactory {
//   return (entityType, repositoryType) => {
//     const elasticSearchRepositoryManager = Container.get(ElasticSearchRepositoryManager);
//     return elasticSearchRepositoryManager.getRepository(entityType, repositoryType);
//   };
// }

function getTypeOrmRepositoryFactory(database: Database): RepositoryFactory {
  return (entity, repositoryType) => {
    const dataSource = typeormDataSourcesMap.fetch(database);
    if (repositoryType) {
      if (repositoryType.name === 'Repository') return dataSource.getRepository(entity);
      if (repositoryType.name !== 'BaseSqlRepository') {
        // eslint-disable-next-line new-cap
        return new repositoryType(dataSource.manager);
      }
    }
    return new BaseSqlRepository(new TypeORMEntityManager(dataSource.manager), entity);
  };
}

export const databaseRepositoryMap = new Map<Database, RepositoryFactory>([[Database.Mysql, getTypeOrmRepositoryFactory(Database.Mysql)]]);
