import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn, Unique } from 'typeorm';

import { Entity } from '@app/entity-management/decorators/entity.decorator';
import { Field } from '@entities/_common/decorators/field.decorator';
import { ObjectId } from '@entities/_common/object-id/object-id';
import { BaseEntity } from '@common/base-types/base.entity';

import { WorkoutExerciseSet } from '../workout-exercise-set/workout-exercise-set.entity';
import { Exercise } from '../exercise/exercise.entity';
import { Workout } from '../workout/workout.entity';
import { PlanWorkoutExerciseSetOverride } from '../plan-workout-exercise-set-override/plan-workout-exercise-set-override.entity';

@Entity()
@Unique('UQ_WORKOUT_EXERCISE_ORDER', ['workoutId', 'order'])
export class WorkoutExercise extends BaseEntity {
  @Field((_type) => ObjectId)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field((_type) => Number)
  @Column({ type: 'int' })
  order!: number;

  @Field((_type) => Number, { nullable: true })
  @Column({ type: 'int', nullable: true })
  rest?: number | null;

  @Field((_type) => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  notes!: string;

  // * Many-to-one relations

  @Column({ name: 'exercise_id' })
  exerciseId!: number;

  @ManyToOne(() => Exercise, (exercise) => exercise.workoutExercises)
  @JoinColumn({ name: 'exercise_id' })
  exercise!: Exercise;

  @Column({ name: 'workout_id' })
  workoutId!: number;

  @ManyToOne(() => Workout, (workout) => workout.workoutExercises, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workout_id' })
  workout!: Workout;

  // * One-to-many relations

  @OneToMany(() => WorkoutExerciseSet, (set) => set.workoutExercise, {
    cascade: true
  })
  sets!: Promise<WorkoutExerciseSet[]>;

  @OneToMany(() => PlanWorkoutExerciseSetOverride, (override) => override.workoutExercise)
  overrides!: Promise<PlanWorkoutExerciseSetOverride[]>;
}
