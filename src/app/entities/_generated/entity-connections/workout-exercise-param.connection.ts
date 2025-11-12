// This file was generated automatically.
// All manual modifications will be lost!
import { ValidateNested } from 'class-validator';
import { ArgsType, Int, ObjectType } from 'type-graphql';

import { IConnection } from '../../../query-building/connection/interfaces/connection.interface';
import { PageInfo } from '../../../query-building/connection/models/page-info.model';
import { PaginationArgs } from '../../../query-building/pagination/models/pagination-args.model';
import { Field as GraphQLField } from '../../_common/decorators/field.decorator';
import { WorkoutExerciseParam } from '../../workout-exercise-param/workout-exercise-param.entity';

@ObjectType()
export class WorkoutExerciseParamConnection implements IConnection<WorkoutExerciseParam> {
  @GraphQLField(() => [WorkoutExerciseParam], { description: 'A list of nodes.' })
  public edges!: WorkoutExerciseParam[];

  @GraphQLField({ description: 'Information to aid in pagination.' })
  public pageInfo!: PageInfo;

  @GraphQLField(_type => Int, { description: 'Identifies the total count of WorkoutExerciseParams in the connection.' })
  public totalCount!: number;
}

@ArgsType()
export class WorkoutExerciseParamsArgs extends PaginationArgs {}
