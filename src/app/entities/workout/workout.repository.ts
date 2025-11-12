import { EntityManager } from 'typeorm';

import { BaseSqlRepository } from '@entity-management/external-providers/typeorm/base-sql.repository';

import { Workout } from './workout.entity';
import { TypeORMEntityManager } from '@entity-management/external-providers/typeorm/typeorm-entity-manager.adapter';

export class WorkoutRepository extends BaseSqlRepository<Workout> {
  constructor(manager: EntityManager) {
    super(new TypeORMEntityManager(manager), Workout);
  }
}
