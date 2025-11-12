import { EntityManager } from 'typeorm';

import { BaseSqlRepository } from '@entity-management/external-providers/typeorm/base-sql.repository';

import { WorkoutExerciseParam } from './workout-exercise-param.entity';
import { TypeORMEntityManager } from '@entity-management/external-providers/typeorm/typeorm-entity-manager.adapter';

export class WorkoutExerciseParamRepository extends BaseSqlRepository<WorkoutExerciseParam> {
  constructor(manager: EntityManager) {
    super(new TypeORMEntityManager(manager), WorkoutExerciseParam);
  }
}
