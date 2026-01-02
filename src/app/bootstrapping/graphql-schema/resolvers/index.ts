import type { NonEmptyArray } from 'type-graphql';

import { AvatarImageResolver } from '@entities/avatar-image/avatar-image.resolver';
import { SubscriptionResolver } from '@entities/subscription/subscription.resolver';
import { UserResolver } from '@app/entities/user/user.resolver';
import { PlanResolver } from '@app/entities/plan/plan.resolver';
import { PlanWorkoutResolver } from '@app/entities/plan-workout/plan-workout.resolver';
import { WorkoutExerciseResolver } from '@app/entities/workout-exercise/workout-exercise.resolver';
import { ExerciseResolver } from '@app/entities/exercise/exercise.resolver';
import { WorkoutResolver } from '@app/entities/workout/workout.resolver';
import { CategoryResolver } from '@app/entities/category/category.resolver';
import { WorkoutExerciseSetResolver } from '@app/entities/workout-exercise-set/workout-exercise-set.resolver';
import { PlanWorkoutExerciseSetOverride } from '@app/entities/plan-workout-exercise-set-override/plan-workout-exercise-set-override.entity';

const resolvers: NonEmptyArray<Function> = [
  // Business entities
  AvatarImageResolver,
  SubscriptionResolver,
  UserResolver,
  // Core entities
  CategoryResolver,
  PlanResolver,
  PlanWorkoutResolver,
  WorkoutResolver,
  WorkoutExerciseResolver,
  ExerciseResolver,
  WorkoutExerciseSetResolver,
  PlanWorkoutExerciseSetOverride
];

export default resolvers;
