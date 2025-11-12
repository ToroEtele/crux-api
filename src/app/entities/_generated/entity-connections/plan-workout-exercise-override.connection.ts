// This file was generated automatically.
// All manual modifications will be lost!
import { ValidateNested } from 'class-validator';
import { ArgsType, Int, ObjectType } from 'type-graphql';

import { IConnection } from '../../../query-building/connection/interfaces/connection.interface';
import { PageInfo } from '../../../query-building/connection/models/page-info.model';
import { PaginationArgs } from '../../../query-building/pagination/models/pagination-args.model';
import { Field as GraphQLField } from '../../_common/decorators/field.decorator';
import { PlanWorkoutExerciseOverride } from '../../plan-workout-exercise-override/plan-workout-exercise-override.entity';

@ObjectType()
export class PlanWorkoutExerciseOverrideConnection implements IConnection<PlanWorkoutExerciseOverride> {
  @GraphQLField(() => [PlanWorkoutExerciseOverride], { description: 'A list of nodes.' })
  public edges!: PlanWorkoutExerciseOverride[];

  @GraphQLField({ description: 'Information to aid in pagination.' })
  public pageInfo!: PageInfo;

  @GraphQLField(_type => Int, {
    description: 'Identifies the total count of PlanWorkoutExerciseOverrides in the connection.',
  })
  public totalCount!: number;
}

@ArgsType()
export class PlanWorkoutExerciseOverridesArgs extends PaginationArgs {}
