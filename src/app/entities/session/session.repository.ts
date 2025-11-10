import { EntityManager } from 'typeorm';

import { BaseSqlRepository } from '@entity-management/external-providers/typeorm/base-sql.repository';

import { Session } from './session.entity';
import { TypeORMEntityManager } from '@entity-management/external-providers/typeorm/typeorm-entity-manager.adapter';

export class SessionRepository extends BaseSqlRepository<Session> {
  constructor(manager: EntityManager) {
    super(new TypeORMEntityManager(manager), Session);
  }
}
