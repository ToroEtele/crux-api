import { EntityManager } from 'typeorm';

import { TypeORMEntityManager } from '@entity-management/external-providers/typeorm/typeorm-entity-manager.adapter';
import { BaseSqlRepository } from '@entity-management/external-providers/typeorm/base-sql.repository';

import { Subscription } from './subscription.entity';

export class SubscriptionRepository extends BaseSqlRepository<Subscription> {
  constructor(manager: EntityManager) {
    super(new TypeORMEntityManager(manager), Subscription);
  }
}
