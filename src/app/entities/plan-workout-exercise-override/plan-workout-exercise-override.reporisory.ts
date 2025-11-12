import { EntityManager } from 'typeorm';

import { BaseSqlRepository } from '@entity-management/external-providers/typeorm/base-sql.repository';

import { PlanWorkoutExerciseOverride } from './plan-workout-exercise-override.entity';
import { TypeORMEntityManager } from '@entity-management/external-providers/typeorm/typeorm-entity-manager.adapter';

export class PlanWorkoutExerciseOverrideRepository extends BaseSqlRepository<PlanWorkoutExerciseOverride> {
  constructor(manager: EntityManager) {
    super(new TypeORMEntityManager(manager), PlanWorkoutExerciseOverride);
  }
}
