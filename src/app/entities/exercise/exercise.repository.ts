import { EntityManager } from 'typeorm';

import { BaseSqlRepository } from '@entity-management/external-providers/typeorm/base-sql.repository';

import { Exercise } from './exercise.entity';
import { TypeORMEntityManager } from '@entity-management/external-providers/typeorm/typeorm-entity-manager.adapter';

export class ExerciseRepository extends BaseSqlRepository<Exercise> {
  constructor(manager: EntityManager) {
    super(new TypeORMEntityManager(manager), Exercise);
  }
}
