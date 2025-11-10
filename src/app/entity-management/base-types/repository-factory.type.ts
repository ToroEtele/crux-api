import { Repository } from 'typeorm';

import { IBaseRepository } from '@entity-management/interfaces/base-repository.interface';
import { Constructable } from '@common/base-types/constructable.type';

export type RepositoryFactory = <TEntity extends {}>(
  entity: Constructable<TEntity>,
  repositoryType?: Constructable<IBaseRepository<TEntity>>
) => IBaseRepository<TEntity> | Repository<TEntity>;
