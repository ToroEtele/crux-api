import { Arg, FieldResolver, Mutation, Resolver, Root } from 'type-graphql';
import { isUndefined, omitBy } from 'lodash';
import { Service } from 'typedi';

import { AuthorizedAdmin } from '@app/access-control/authorization/authorized-admin.decorator';
import { InjectRepository } from '@entity-management/decorators/inject-repository.decorator';
import { InjectScoped, MaybeInjectScopedOrThrow } from '@app/access-control/scoping/inject-scoped.decorator';
import { ObjectId } from '../_common/object-id/object-id';

import { PlanWorkoutExerciseSetOverride } from '../plan-workout-exercise-set-override/plan-workout-exercise-set-override.entity';
import { WorkoutExerciseSet } from '../workout-exercise-set/workout-exercise-set.entity';
import { WorkoutExercise } from './workout-exercise.entity';
import { Exercise } from '../exercise/exercise.entity';
import { Workout } from '../workout/workout.entity';

import { PlanWorkoutExerciseOverrideRepository } from '../plan-workout-exercise-set-override/plan-workout-exercise-set-override.reporisory';
import { WorkoutExerciseSetRepository } from '../workout-exercise-set/workout-exercise-set.repository';
import { WorkoutExerciseRepository } from './workout-exercise.repository';
import { ExerciseRepository } from '../exercise/exercise.repository';

import { WorkoutExerciseBaseResolver } from '../_generated/entity-base-resolvers/workout-exercise.base-resolver';

import { CreateWorkoutExerciseInput } from './types/create-workout-exercise.input-type';
import { UpdateWorkoutExerciseInput } from './types/update-workout-exercise.input-type';
import { Plan } from '../plan/plan.entity';

@Service()
@Resolver((_of) => WorkoutExercise)
export class WorkoutExerciseResolver extends WorkoutExerciseBaseResolver {
  constructor(
    @InjectRepository(WorkoutExercise)
    private repository: WorkoutExerciseRepository,
    @InjectRepository(Exercise)
    private exerciseRepository: ExerciseRepository,
    @InjectRepository(WorkoutExerciseSet)
    private setRepository: WorkoutExerciseSetRepository,
    @InjectRepository(PlanWorkoutExerciseSetOverride)
    private overridesRepository: PlanWorkoutExerciseOverrideRepository
  ) {
    super(repository);
  }

  @AuthorizedAdmin()
  @Mutation(() => WorkoutExercise)
  async createWorkoutExercise(
    @Arg('input') input: CreateWorkoutExerciseInput,
    @InjectScoped('input.exerciseId', Exercise) exercise: Exercise,
    @InjectScoped('input.workoutId', Workout) workout: Workout
  ): Promise<WorkoutExercise> {
    return await this.repository.buildAndSave({
      ...input,
      exercise,
      workout
    });
  }

  @AuthorizedAdmin()
  @Mutation(() => WorkoutExercise)
  async updateWorkoutExercise(
    @Arg('id') id: ObjectId,
    @Arg('input') input: UpdateWorkoutExerciseInput,
    @InjectScoped('id.id', WorkoutExercise) workoutExercise: WorkoutExercise
  ): Promise<WorkoutExercise> {
    return await this.repository.update(workoutExercise, omitBy(input, isUndefined));
  }

  @FieldResolver((_type) => Exercise)
  async exercise(@Root() workoutExercise: WorkoutExercise): Promise<Exercise> {
    return await this.exerciseRepository.findOneOrThrow(workoutExercise.exerciseId);
  }

  @FieldResolver((_type) => [WorkoutExerciseSet])
  async sets(
    @Root() workoutExercise: WorkoutExercise,
    @Arg('planId', (_type) => ObjectId, { nullable: true }) planId?: ObjectId | null,
    @MaybeInjectScopedOrThrow('planId.id', Plan) plan?: Plan | null
  ): Promise<WorkoutExerciseSet[]> {
    const sets = await this.setRepository
      .createQueryBuilder()
      .where({ workoutExerciseId: { eq: workoutExercise.id } })
      .getMany();

    if (!planId) return sets;

    const overridesQuery = this.overridesRepository.createQueryBuilder().where({ workoutExerciseSetId: { in: sets.map((set) => set.id) } });
    overridesQuery.builder.innerJoin('planWorkoutExerciseSetOverride.planWorkout', 'planWorkout', 'planWorkout.planId = :planId', { planId });
    const overrides = await overridesQuery.getMany();

    return sets.map((set) => ({ ...set, ...overrides.find((o) => o.workoutExerciseSetId === set.id || {}) }));
  }
}
