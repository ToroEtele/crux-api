import { FieldResolver, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { InjectRepository } from '@entity-management/decorators/inject-repository.decorator';
import { PlanWorkoutBaseResolver } from '../_generated/entity-base-resolvers/plan-workout.base-resolver';

import { PlanWorkout } from './plan-workout.entity';
import { Workout } from '../workout/workout.entity';

import { WorkoutRepository } from '../workout/workout.repository';
import { PlanWorkoutRepository } from './plan-workout.repository';

@Service()
@Resolver((_of) => PlanWorkout)
export class PlanWorkoutResolver extends PlanWorkoutBaseResolver {
  constructor(
    @InjectRepository(PlanWorkout) private repository: PlanWorkoutRepository,
    @InjectRepository(Workout) private workoutRepository: WorkoutRepository
  ) {
    super(repository);
  }

  @FieldResolver((_type) => Workout)
  async workout(@Root() planWorkout: PlanWorkout): Promise<Workout> {
    return await this.workoutRepository.findOneOrThrow(planWorkout.workoutId);
  }
}
