import { EntityManager } from 'typeorm';

import { BaseSqlRepository } from '@entity-management/external-providers/typeorm/base-sql.repository';

import { WorkoutExercise } from './workout-exercise.entity';
import { TypeORMEntityManager } from '@entity-management/external-providers/typeorm/typeorm-entity-manager.adapter';

export class WorkoutExerciseRepository extends BaseSqlRepository<WorkoutExercise> {
  constructor(manager: EntityManager) {
    super(new TypeORMEntityManager(manager), WorkoutExercise);
  }
}
