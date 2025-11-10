import { IBaseRepositoryMethodOptions } from '@entity-management/interfaces/base-repository-method-options.interface.';
import { TypeORMEntityManager } from '../typeorm-entity-manager.adapter';

export interface IBaseSqlRepositoryMethodOptions extends IBaseRepositoryMethodOptions {
  transactionalEntityManager?: TypeORMEntityManager;
}
