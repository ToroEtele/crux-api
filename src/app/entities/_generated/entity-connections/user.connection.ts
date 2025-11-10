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
import { User } from '../../user/user.entity';
import { UsersFilterInput } from '../connection-filters/user-connection-filter.input-type';
import { UsersOrderInput } from '../input-types/user-order.input-type';

@ObjectType()
export class UserConnection implements IConnection<User> {
  @GraphQLField(() => [User], { description: 'A list of nodes.' })
  public edges!: User[];

  @GraphQLField({ description: 'Information to aid in pagination.' })
  public pageInfo!: PageInfo;

  @GraphQLField(_type => Int, { description: 'Identifies the total count of Users in the connection.' })
  public totalCount!: number;
}

@ArgsType()
export class UsersArgs extends PaginationArgs implements IConnectionArgs<User> {
  @ValidateNested()
  @GraphQLField(_type => UsersFilterInput, {
    nullable: true,
    description: 'Filtering options for Users returned from the connection.',
  })
  public filter?: UsersFilterInput | null;

  @GraphQLField(_type => [UsersOrderInput], {
    nullable: true,
    description: 'Ordering options for Users returned from the connection.',
  })
  public orderBy?: ISort[] | null;
}
