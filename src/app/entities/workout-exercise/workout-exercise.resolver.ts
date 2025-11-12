import { FieldResolver, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { InjectRepository } from '@entity-management/decorators/inject-repository.decorator';
import { WorkoutExerciseBaseResolver } from '../_generated/entity-base-resolvers/workout-exercise.base-resolver';

import { WorkoutExercise } from './workout-exercise.entity';
import { Exercise } from '../exercise/exercise.entity';

import { WorkoutExerciseRepository } from './workout-exercise.repository';
import { ExerciseRepository } from '../exercise/exercise.repository';

@Service()
@Resolver((_of) => WorkoutExercise)
export class WorkoutExerciseResolver extends WorkoutExerciseBaseResolver {
  constructor(
    @InjectRepository(WorkoutExercise)
    private repository: WorkoutExerciseRepository,
    @InjectRepository(Exercise)
    private exerciseRepository: ExerciseRepository
  ) {
    super(repository);
  }

  @FieldResolver((_type) => Exercise)
  async exercise(@Root() workoutExercise: WorkoutExercise): Promise<Exercise> {
    return await this.exerciseRepository.findOneOrThrow(workoutExercise.exerciseId);
  }
}
