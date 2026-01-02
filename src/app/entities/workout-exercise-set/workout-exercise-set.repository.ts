import { EntityManager } from 'typeorm';

import { BaseSqlRepository } from '@entity-management/external-providers/typeorm/base-sql.repository';

import { WorkoutExerciseSet } from './workout-exercise-set.entity';
import { TypeORMEntityManager } from '@entity-management/external-providers/typeorm/typeorm-entity-manager.adapter';

export class WorkoutExerciseSetRepository extends BaseSqlRepository<WorkoutExerciseSet> {
  constructor(manager: EntityManager) {
    super(new TypeORMEntityManager(manager), WorkoutExerciseSet);
  }
}
