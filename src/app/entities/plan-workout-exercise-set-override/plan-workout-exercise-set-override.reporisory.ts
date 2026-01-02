import { EntityManager } from 'typeorm';

import { BaseSqlRepository } from '@entity-management/external-providers/typeorm/base-sql.repository';

import { TypeORMEntityManager } from '@entity-management/external-providers/typeorm/typeorm-entity-manager.adapter';
import { PlanWorkoutExerciseSetOverride } from './plan-workout-exercise-set-override.entity';

export class PlanWorkoutExerciseOverrideRepository extends BaseSqlRepository<PlanWorkoutExerciseSetOverride> {
  constructor(manager: EntityManager) {
    super(new TypeORMEntityManager(manager), PlanWorkoutExerciseSetOverride);
  }
}
