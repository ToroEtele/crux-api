// This file was generated automatically.
// All manual modifications will be lost!
import { ValidateNested } from 'class-validator';
import { InputType } from 'type-graphql';

import { ConnectionFilterOperator } from '../../../query-building/connection/filtering/constants/connection-filter-operator.enum';
import { ConnectionFilter } from '../../../query-building/connection/filtering/interfaces/connection-filter.interface';
import { ConnectionStringFilterInput } from '../../../query-building/connection/filtering/types/connection-string-filter.input';
import { Field as GraphQLField } from '../../_common/decorators/field.decorator';
import { Category } from '../../category/category.entity';

@InputType()
export class CategoriesFilterInput implements ConnectionFilter<Category> {
  @GraphQLField(_type => ConnectionStringFilterInput, { nullable: true, admin: false })
  @ValidateNested()
  public name?: ConnectionStringFilterInput;

  @GraphQLField(_type => [CategoriesFilterInput], {
    nullable: true,
    description: 'Groups each filter object using AND',
  })
  @ValidateNested()
  public [ConnectionFilterOperator.and]?: CategoriesFilterInput[];

  @GraphQLField(_type => [CategoriesFilterInput], {
    nullable: true,
    description: 'Groups each filter object using OR',
  })
  @ValidateNested()
  public [ConnectionFilterOperator.or]?: CategoriesFilterInput[];
}
