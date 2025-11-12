import { EntityManager } from 'typeorm';

import { BaseSqlRepository } from '@entity-management/external-providers/typeorm/base-sql.repository';

import { Category } from './category.entity';
import { TypeORMEntityManager } from '@entity-management/external-providers/typeorm/typeorm-entity-manager.adapter';

export class CategoryRepository extends BaseSqlRepository<Category> {
  constructor(manager: EntityManager) {
    super(new TypeORMEntityManager(manager), Category);
  }
}
