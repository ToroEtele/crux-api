// This file was generated automatically.
// All manual modifications will be lost!
import { ValidateNested } from 'class-validator';
import { ArgsType, Int, ObjectType } from 'type-graphql';

import { IConnectionArgs } from '../../../query-building/connection/interfaces/connection-args.interface';
import { IConnection } from '../../../query-building/connection/interfaces/connection.interface';
import { PageInfo } from '../../../query-building/connection/models/page-info.model';
import { PaginationArgs } from '../../../query-building/pagination/models/pagination-args.model';
import { ISort } from '../../../query-building/sorting/interfaces/sort.interface';
import { Field as GraphQLField } from '../../_common/decorators/field.decorator';
import { Workout } from '../../workout/workout.entity';
import { WorkoutsFilterInput } from '../connection-filters/workout-connection-filter.input-type';
import { WorkoutsOrderInput } from '../input-types/workout-order.input-type';

@ObjectType()
export class WorkoutConnection implements IConnection<Workout> {
  @GraphQLField(() => [Workout], { description: 'A list of nodes.' })
  public edges!: Workout[];

  @GraphQLField({ description: 'Information to aid in pagination.' })
  public pageInfo!: PageInfo;

  @GraphQLField(_type => Int, { description: 'Identifies the total count of Workouts in the connection.' })
  public totalCount!: number;
}

@ArgsType()
export class WorkoutsArgs extends PaginationArgs implements IConnectionArgs<Workout> {
  @ValidateNested()
  @GraphQLField(_type => WorkoutsFilterInput, {
    nullable: true,
    description: 'Filtering options for Workouts returned from the connection.',
  })
  public filter?: WorkoutsFilterInput | null;

  @GraphQLField(_type => [WorkoutsOrderInput], {
    nullable: true,
    description: 'Ordering options for Workouts returned from the connection.',
  })
  public orderBy?: ISort[] | null;
}
