import { Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn, Index } from 'typeorm';

import { Entity } from '@app/entity-management/decorators/entity.decorator';
import { Field } from '@entities/_common/decorators/field.decorator';
import { ObjectId } from '@entities/_common/object-id/object-id';
import { BaseEntity } from '@common/base-types/base.entity';

import { PlanWorkout } from '../plan-workout/plan-workout.entity';
import { WorkoutExercise } from '../workout-exercise/workout-exercise.entity';

@Entity()
@Index(['planWorkoutId'])
@Index(['workoutExerciseId'])
export class PlanWorkoutExerciseOverride extends BaseEntity {
  @Field((_type) => ObjectId)
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'plan_workout_id' })
  planWorkoutId!: number;

  @Column({ name: 'workout_exercise_id' })
  workoutExerciseId!: number;

  @Field((_type) => String)
  @Column({ type: 'varchar', length: 255 })
  field!: string;

  @Field((_type) => String)
  @Column({ name: 'new_value', type: 'varchar', length: 255 })
  newValue!: string;

  @Field((_type) => String)
  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  @ManyToOne(() => PlanWorkout, (planWorkout) => planWorkout.workoutPlanExerciseOverrides, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'plan_workout_id' })
  planWorkout!: PlanWorkout;

  @ManyToOne(() => WorkoutExercise, (we) => we.workoutPlanExerciseOverrides)
  @JoinColumn({ name: 'workout_exercise_id' })
  workoutExercise!: WorkoutExercise;
}
