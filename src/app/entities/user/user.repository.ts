import { EntityManager } from 'typeorm';

import { BaseSqlRepository } from '@entity-management/external-providers/typeorm/base-sql.repository';

import { User } from './user.entity';
import { TypeORMEntityManager } from '@entity-management/external-providers/typeorm/typeorm-entity-manager.adapter';

export class UserRepository extends BaseSqlRepository<User> {
  constructor(manager: EntityManager) {
    super(new TypeORMEntityManager(manager), User);
  }
}
