import { InputType, Field, Int } from 'type-graphql';

import { ObjectId } from '@app/entities/_common/object-id/object-id';

@InputType()
export class CreateWorkoutExerciseInput {
  @Field(() => Int)
  order!: number;

  @Field(() => Int)
  rest!: number;

  @Field(() => String, { nullable: true })
  notes!: string;

  @Field(() => ObjectId)
  exerciseId!: number;

  @Field(() => ObjectId)
  workoutId!: number;
}
