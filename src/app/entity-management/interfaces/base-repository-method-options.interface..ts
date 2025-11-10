import { IEntityManager } from './entity-manager.interface';

export interface IBaseRepositoryMethodOptions {
  transactionalEntityManager?: IEntityManager;
}
