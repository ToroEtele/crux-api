import { EntityManager } from 'typeorm';

import { BaseSqlRepository } from '@entity-management/external-providers/typeorm/base-sql.repository';

import { PlanWorkout } from './plan-workout.entity';
import { TypeORMEntityManager } from '@entity-management/external-providers/typeorm/typeorm-entity-manager.adapter';

export class PlanWorkoutRepository extends BaseSqlRepository<PlanWorkout> {
  constructor(manager: EntityManager) {
    super(new TypeORMEntityManager(manager), PlanWorkout);
  }
}
