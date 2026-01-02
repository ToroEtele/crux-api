import { Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { InjectRepository } from '@entity-management/decorators/inject-repository.decorator';

import { WorkoutExerciseSetBaseResolver } from '../_generated/entity-base-resolvers/workout-exercise-set.base-resolver';
import { WorkoutExerciseSetRepository } from '../workout-exercise-set/workout-exercise-set.repository';
import { WorkoutExerciseSet } from '../workout-exercise-set/workout-exercise-set.entity';

@Service()
@Resolver((_of) => WorkoutExerciseSet)
export class WorkoutExerciseSetResolver extends WorkoutExerciseSetBaseResolver {
  constructor(
    @InjectRepository(WorkoutExerciseSet)
    private repository: WorkoutExerciseSetRepository
  ) {
    super(repository);
  }
}
