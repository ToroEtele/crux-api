import { EntityManager } from 'typeorm';

import { BaseSqlRepository } from '@entity-management/external-providers/typeorm/base-sql.repository';

import { Plan } from './plan.entity';
import { TypeORMEntityManager } from '@entity-management/external-providers/typeorm/typeorm-entity-manager.adapter';

export class PlanRepository extends BaseSqlRepository<Plan> {
  constructor(manager: EntityManager) {
    super(new TypeORMEntityManager(manager), Plan);
  }
}
