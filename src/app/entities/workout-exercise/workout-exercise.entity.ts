import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

import { Entity } from '@app/entity-management/decorators/entity.decorator';
import { Field } from '@entities/_common/decorators/field.decorator';
import { ObjectId } from '@entities/_common/object-id/object-id';
import { BaseEntity } from '@common/base-types/base.entity';

import { WorkoutExerciseSet } from '../workout-exercise-set/workout-exercise-set.entity';
import { Exercise } from '../exercise/exercise.entity';
import { Workout } from '../workout/workout.entity';

@Entity()
export class WorkoutExercise extends BaseEntity {
  @Field((_type) => ObjectId)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field((_type) => Number)
  @Column({ type: 'int' })
  order!: number;

  @Column({ name: 'exercise_id' })
  exerciseId!: number;

  @Column({ name: 'workout_id' })
  workoutId!: number;

  @Field((_type) => Number)
  @Column({ type: 'int', nullable: true })
  rest?: number | null;

  @Field((_type) => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  notes!: string;

  // * Many-to-one relations

  @ManyToOne(() => Exercise, (exercise) => exercise.workoutExercises)
  @JoinColumn({ name: 'exercise_id' })
  exercise!: Exercise;

  @ManyToOne(() => Workout, (workout) => workout.workoutExercises, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workout_id' })
  workout!: Workout;

  // * One-to-many relations

  @OneToMany(() => WorkoutExerciseSet, (set) => set.workoutExercise, {
    cascade: true
  })
  sets!: Promise<WorkoutExerciseSet[]>;
}
