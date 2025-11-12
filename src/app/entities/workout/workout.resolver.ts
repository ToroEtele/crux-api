import { FieldResolver, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { InjectRepository } from '@entity-management/decorators/inject-repository.decorator';
import { WorkoutBaseResolver } from '../_generated/entity-base-resolvers/workout.base-resolver';

import { WorkoutExercise } from '../workout-exercise/workout-exercise.entity';
import { Category } from '../category/category.entity';
import { Workout } from './workout.entity';

import { WorkoutExerciseRepository } from '../workout-exercise/workout-exercise.repository';
import { CategoryRepository } from '../category/category.repository';
import { WorkoutRepository } from './workout.repository';

@Service()
@Resolver((_of) => Workout)
export class WorkoutResolver extends WorkoutBaseResolver {
  constructor(
    @InjectRepository(Category) private categoryRepository: CategoryRepository,
    @InjectRepository(WorkoutExercise) private workoutExerciseRepository: WorkoutExerciseRepository,
    @InjectRepository(Workout) private repository: WorkoutRepository
  ) {
    super(repository);
  }

  @FieldResolver((_type) => Category)
  async category(@Root() workout: Workout): Promise<Category> {
    return await this.categoryRepository.findOneOrThrow(workout.categoryId);
  }

  @FieldResolver((_type) => [WorkoutExercise])
  async workoutExercises(@Root() workout: Workout): Promise<WorkoutExercise[]> {
    return await this.workoutExerciseRepository
      .createQueryBuilder()
      .where({ workoutId: { eq: workout.id } })
      .getMany();
  }
}
