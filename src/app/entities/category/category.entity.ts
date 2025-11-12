import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Entity } from '@app/entity-management/decorators/entity.decorator';
import { Field } from '@entities/_common/decorators/field.decorator';
import { ObjectId } from '@entities/_common/object-id/object-id';
import { BaseEntity } from '@common/base-types/base.entity';

import { Exercise } from '../exercise/exercise.entity';
import { Workout } from '../workout/workout.entity';
import { Plan } from '../plan/plan.entity';

@Entity()
export class Category extends BaseEntity {
  @Field((_type) => ObjectId)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String, { filterable: true, sortable: true })
  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @OneToMany(() => Exercise, (exercise) => exercise.category)
  exercises!: Promise<Exercise[]>;

  @OneToMany(() => Workout, (workout) => workout.category)
  workouts!: Promise<Workout[]>;

  @OneToMany(() => Plan, (plan) => plan.category)
  plans!: Promise<Plan[]>;
}
