// This file was generated automatically.
// All manual modifications will be lost!
/* eslint-disable @typescript-eslint/sort-type-constituents,import/order */
import { Constructable } from '../../../_common/base-types/constructable.type';
import { StrictMap } from '../../../_common/strict-map';
import { AvatarImage } from '../../avatar-image/avatar-image.entity';
import { Session } from '../../session/session.entity';
import { User } from '../../user/user.entity';
import { Account } from '../../account/account.entity';
import { Plan } from '../../plan/plan.entity';
import { PlanWorkoutExerciseOverride } from '../../plan-workout-exercise-override/plan-workout-exercise-override.entity';
import { PlanWorkout } from '../../plan-workout/plan-workout.entity';
import { Workout } from '../../workout/workout.entity';
import { WorkoutExerciseParam } from '../../workout-exercise-param/workout-exercise-param.entity';
import { WorkoutExercise } from '../../workout-exercise/workout-exercise.entity';
import { Exercise } from '../../exercise/exercise.entity';
import { Category } from '../../category/category.entity';
import { Subscription } from '../../subscription/subscription.entity';
import { VerificationToken } from '../../verification-token/verification-token.entity';

export type NonAbstractEntity =
  | AvatarImage
  | Session
  | User
  | Account
  | Plan
  | PlanWorkoutExerciseOverride
  | PlanWorkout
  | Workout
  | WorkoutExerciseParam
  | WorkoutExercise
  | Exercise
  | Category
  | Subscription
  | VerificationToken;
export type NonRetrievableEntity =
  | AvatarImage
  | Session
  | User
  | Account
  | Plan
  | PlanWorkoutExerciseOverride
  | PlanWorkout
  | Workout
  | WorkoutExerciseParam
  | WorkoutExercise
  | Exercise
  | Category
  | Subscription
  | VerificationToken;
export type Entity = NonRetrievableEntity;

export const allEntities = [
  AvatarImage,
  Session,
  User,
  Account,
  Plan,
  PlanWorkoutExerciseOverride,
  PlanWorkout,
  Workout,
  WorkoutExerciseParam,
  WorkoutExercise,
  Exercise,
  Category,
  Subscription,
  VerificationToken,
];

export const nonRetrievableEntities = [
  AvatarImage,
  Session,
  User,
  Account,
  Plan,
  PlanWorkoutExerciseOverride,
  PlanWorkout,
  Workout,
  WorkoutExerciseParam,
  WorkoutExercise,
  Exercise,
  Category,
  Subscription,
  VerificationToken,
];

export const entityNameTypeMapping = new StrictMap<string, Constructable<NonAbstractEntity>>('entityNameTypeMapping', [
  ['AvatarImage', AvatarImage],
  ['Session', Session],
  ['User', User],
  ['Account', Account],
  ['Plan', Plan],
  ['PlanWorkoutExerciseOverride', PlanWorkoutExerciseOverride],
  ['PlanWorkout', PlanWorkout],
  ['Workout', Workout],
  ['WorkoutExerciseParam', WorkoutExerciseParam],
  ['WorkoutExercise', WorkoutExercise],
  ['Exercise', Exercise],
  ['Category', Category],
  ['Subscription', Subscription],
  ['VerificationToken', VerificationToken],
]);
