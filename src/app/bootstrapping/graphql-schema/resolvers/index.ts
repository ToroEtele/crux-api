import type { NonEmptyArray } from 'type-graphql';

import { AvatarImageResolver } from '@entities/avatar-image/avatar-image.resolver';
import { SubscriptionResolver } from '@entities/subscription/subscription.resolver';
import { UserResolver } from '@app/entities/user/user.resolver';
import { PlanResolver } from '@app/entities/plan/plan.resolver';
import { PlanWorkoutResolver } from '@app/entities/plan-workout/plan-workout.resolver';
import { WorkoutExerciseResolver } from '@app/entities/workout-exercise/workout-exercise.resolver';
import { ExerciseResolver } from '@app/entities/exercise/exercise.resolver';
import { WorkoutResolver } from '@app/entities/workout/workout.resolver';

const resolvers: NonEmptyArray<Function> = [
  // Business entities
  AvatarImageResolver,
  SubscriptionResolver,
  UserResolver,
  // Core entities
  PlanResolver,
  PlanWorkoutResolver,
  WorkoutResolver,
  WorkoutExerciseResolver,
  ExerciseResolver
];

export default resolvers;
