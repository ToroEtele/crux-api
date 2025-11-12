import { Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';

import { Entity } from '@app/entity-management/decorators/entity.decorator';
import { Field } from '@entities/_common/decorators/field.decorator';
import { ObjectId } from '@entities/_common/object-id/object-id';

import { WorkoutExercise } from '../workout-exercise/workout-exercise.entity';

@Entity({ skipId: true })
export class WorkoutExerciseParam {
  @Field((_type) => ObjectId)
  @PrimaryColumn({ type: 'int' })
  set!: number;

  @Field((_type) => ObjectId)
  @PrimaryColumn({ name: 'workout_exercise_id', type: 'int' })
  workoutExerciseId!: number;

  @Field((_type) => Number)
  @Column({ type: 'float' })
  weight!: number;

  @Field((_type) => Number)
  @Column({ type: 'int' })
  rest!: number;

  @Field((_type) => Number)
  @Column({ type: 'int' })
  time!: number;

  @Field((_type) => Number)
  @Column({ type: 'int' })
  reps!: number;

  @ManyToOne(() => WorkoutExercise, (we) => we.params, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workout_exercise_id' })
  workoutExercise!: WorkoutExercise;
}
