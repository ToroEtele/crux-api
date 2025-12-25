import { Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn, Index } from 'typeorm';

import { Entity } from '@app/entity-management/decorators/entity.decorator';
import { Field } from '@entities/_common/decorators/field.decorator';
import { ObjectId } from '@entities/_common/object-id/object-id';
import { BaseEntity } from '@common/base-types/base.entity';

import { PlanWorkout } from '../plan-workout/plan-workout.entity';
import { WorkoutExerciseSet } from '../workout-exercise-set/workout-exercise-set.entity';

@Entity()
@Index(['planWorkoutId'])
@Index(['workoutExerciseSetId'])
export class PlanWorkoutExerciseSetOverride extends BaseEntity {
  @Field(() => ObjectId)
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'plan_workout_id' })
  planWorkoutId!: number;

  @Column({ name: 'workout_exercise_set_id' })
  workoutExerciseSetId!: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'int', nullable: true })
  reps?: number | null;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'int', nullable: true })
  time?: number | null;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'int', nullable: true })
  weight?: number | null;

  @Field(() => Number, { nullable: true })
  @Column({ name: 'rest_after', type: 'int', nullable: true })
  rest?: number | null;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  @ManyToOne(() => PlanWorkout, (pw) => pw.workoutExerciseSetOverrides, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'plan_workout_id' })
  planWorkout!: PlanWorkout;

  @ManyToOne(() => WorkoutExerciseSet, (set) => set.overrides, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workout_exercise_set_id' })
  workoutExerciseSet!: WorkoutExerciseSet;
}
