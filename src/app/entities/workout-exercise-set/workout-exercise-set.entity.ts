import { Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm';

import { Entity } from '@app/entity-management/decorators/entity.decorator';
import { Field } from '@entities/_common/decorators/field.decorator';
import { ObjectId } from '@entities/_common/object-id/object-id';
import { BaseEntity } from '@common/base-types/base.entity';

import { WorkoutExercise } from '../workout-exercise/workout-exercise.entity';
import { PlanWorkoutExerciseSetOverride } from '../plan-workout-exercise-set-override/plan-workout-exercise-set-override.entity';

@Entity()
export class WorkoutExerciseSet extends BaseEntity {
  @Field(() => ObjectId)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Number)
  @Column({ type: 'int' })
  order!: number;

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

  @Column({ name: 'workout_exercise_id' })
  workoutExerciseId!: number;

  // * Many-to-one relations

  @ManyToOne(() => WorkoutExercise, (we) => we.sets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workout_exercise_id' })
  workoutExercise!: WorkoutExercise;

  // * One-to-many relations

  @OneToMany(() => PlanWorkoutExerciseSetOverride, (override) => override.workoutExerciseSet)
  overrides!: Promise<PlanWorkoutExerciseSetOverride[]>;
}
