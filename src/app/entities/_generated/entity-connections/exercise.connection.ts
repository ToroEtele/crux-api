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
import { Exercise } from '../../exercise/exercise.entity';
import { ExercisesFilterInput } from '../connection-filters/exercise-connection-filter.input-type';
import { ExercisesOrderInput } from '../input-types/exercise-order.input-type';

@ObjectType()
export class ExerciseConnection implements IConnection<Exercise> {
  @GraphQLField(() => [Exercise], { description: 'A list of nodes.' })
  public edges!: Exercise[];

  @GraphQLField({ description: 'Information to aid in pagination.' })
  public pageInfo!: PageInfo;

  @GraphQLField(_type => Int, { description: 'Identifies the total count of Exercises in the connection.' })
  public totalCount!: number;
}

@ArgsType()
export class ExercisesArgs extends PaginationArgs implements IConnectionArgs<Exercise> {
  @ValidateNested()
  @GraphQLField(_type => ExercisesFilterInput, {
    nullable: true,
    description: 'Filtering options for Exercises returned from the connection.',
  })
  public filter?: ExercisesFilterInput | null;

  @GraphQLField(_type => [ExercisesOrderInput], {
    nullable: true,
    description: 'Ordering options for Exercises returned from the connection.',
  })
  public orderBy?: ISort[] | null;
}
