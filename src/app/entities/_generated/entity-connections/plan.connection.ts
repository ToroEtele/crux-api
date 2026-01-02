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
import { Plan } from '../../plan/plan.entity';
import { PlansFilterInput } from '../connection-filters/plan-connection-filter.input-type';
import { PlansOrderInput } from '../input-types/plan-order.input-type';

@ObjectType()
export class PlanConnection implements IConnection<Plan> {
  @GraphQLField(() => [Plan], { description: 'A list of nodes.' })
  public edges!: Plan[];

  @GraphQLField({ description: 'Information to aid in pagination.' })
  public pageInfo!: PageInfo;

  @GraphQLField(_type => Int, { description: 'Identifies the total count of Plans in the connection.' })
  public totalCount!: number;
}

@ArgsType()
export class PlansArgs extends PaginationArgs implements IConnectionArgs<Plan> {
  @ValidateNested()
  @GraphQLField(_type => PlansFilterInput, {
    nullable: true,
    description: 'Filtering options for Plans returned from the connection.',
  })
  public filter?: PlansFilterInput | null;

  @GraphQLField(_type => [PlansOrderInput], {
    nullable: true,
    description: 'Ordering options for Plans returned from the connection.',
  })
  public orderBy?: ISort[] | null;
}
