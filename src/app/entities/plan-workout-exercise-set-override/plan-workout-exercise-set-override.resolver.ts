import { Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { InjectRepository } from '@entity-management/decorators/inject-repository.decorator';

import { PlanWorkoutExerciseSetOverrideBaseResolver } from '../_generated/entity-base-resolvers/plan-workout-exercise-set-override.base-resolver';
import { PlanWorkoutExerciseOverrideRepository } from '../plan-workout-exercise-set-override/plan-workout-exercise-set-override.reporisory';
import { PlanWorkoutExerciseSetOverride } from '../plan-workout-exercise-set-override/plan-workout-exercise-set-override.entity';

@Service()
@Resolver((_of) => PlanWorkoutExerciseSetOverride)
export class PlanWorkoutExerciseSetOverrideResolver extends PlanWorkoutExerciseSetOverrideBaseResolver {
  constructor(
    @InjectRepository(PlanWorkoutExerciseSetOverride)
    private repository: PlanWorkoutExerciseOverrideRepository
  ) {
    super(repository);
  }
}
