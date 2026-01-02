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
import { Category } from '../../category/category.entity';
import { CategoriesFilterInput } from '../connection-filters/category-connection-filter.input-type';
import { CategoriesOrderInput } from '../input-types/category-order.input-type';

@ObjectType()
export class CategoryConnection implements IConnection<Category> {
  @GraphQLField(() => [Category], { description: 'A list of nodes.' })
  public edges!: Category[];

  @GraphQLField({ description: 'Information to aid in pagination.' })
  public pageInfo!: PageInfo;

  @GraphQLField(_type => Int, { description: 'Identifies the total count of Categories in the connection.' })
  public totalCount!: number;
}

@ArgsType()
export class CategoriesArgs extends PaginationArgs implements IConnectionArgs<Category> {
  @ValidateNested()
  @GraphQLField(_type => CategoriesFilterInput, {
    nullable: true,
    description: 'Filtering options for Categories returned from the connection.',
  })
  public filter?: CategoriesFilterInput | null;

  @GraphQLField(_type => [CategoriesOrderInput], {
    nullable: true,
    description: 'Ordering options for Categories returned from the connection.',
  })
  public orderBy?: ISort[] | null;
}
