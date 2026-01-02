import { Arg, FieldResolver, Mutation, Resolver, Root } from 'type-graphql';
import { isUndefined, omitBy } from 'lodash';
import { Service } from 'typedi';

import { AuthorizedAdmin } from '@app/access-control/authorization/authorized-admin.decorator';
import { InjectRepository } from '@entity-management/decorators/inject-repository.decorator';
import { InjectScoped, MaybeInjectScopedOrThrow } from '@app/access-control/scoping/inject-scoped.decorator';
import { ObjectId } from '../_common/object-id/object-id';

import { PlanWorkoutExerciseSetOverride } from '../plan-workout-exercise-set-override/plan-workout-exercise-set-override.entity';
import { WorkoutExerciseSet } from '../workout-exercise-set/workout-exercise-set.entity';
import { PlanWorkout } from '../plan-workout/plan-workout.entity';
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
    @Arg('planWorkoutId', (_type) => ObjectId, { nullable: true }) planWorkoutId?: ObjectId | null,
    @MaybeInjectScopedOrThrow('planWorkoutId.id', PlanWorkout) planWorkout?: PlanWorkout | null
  ): Promise<WorkoutExerciseSet[]> {
    const sets = await this.setRepository
      .createQueryBuilder()
      .where({ workoutExerciseId: { eq: workoutExercise.id } })
      .getMany();

    if (sets.length === 0) return sets;
    if (!planWorkout) return sets;

    const overrides = await this.overridesRepository
      .createQueryBuilder()
      .where({ workoutExerciseId: { eq: workoutExercise.id }, planWorkoutId: { eq: planWorkout.id }, workoutExerciseSetId: { isNull: false } })
      .getMany();

    return [
      ...sets.map((set) => {
        const override = overrides.find((o) => o.workoutExerciseSetId === set.id);
        return {
          ...set,
          order: override?.order || set.order,
          reps: override?.reps || set.reps,
          time: override?.time || set.time,
          weight: override?.weight || set.weight,
          rest: override?.rest || set.rest,
          notes: override?.notes || set.notes
        };
      })
    ];
  }

  @FieldResolver((_type) => [PlanWorkoutExerciseSetOverride])
  async additionalSets(
    @Root() workoutExercise: WorkoutExercise,
    @Arg('planWorkoutId', (_type) => ObjectId) planWorkoutId: ObjectId,
    @InjectScoped('planWorkoutId.id', PlanWorkout) planWorkout: PlanWorkout
  ): Promise<PlanWorkoutExerciseSetOverride[]> {
    return await this.overridesRepository
      .createQueryBuilder()
      .where({ workoutExerciseId: { eq: workoutExercise.id }, planWorkoutId: { eq: planWorkout.id }, workoutExerciseSetId: { isNull: true } })
      .getMany();
  }
}
