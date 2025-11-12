// This file was generated automatically.
// All manual modifications will be lost!
import { InputType } from 'type-graphql';

import { OrderDirection } from '../../../query-building/sorting/constants/order-direction.enum';
import { ISort } from '../../../query-building/sorting/interfaces/sort.interface';
import { Field } from '../../_common/decorators/field.decorator';
import { CategoriesOrderField } from '../constants/category-order-field.enum';

@InputType()
export class CategoriesOrderInput implements ISort {
  @Field(_type => CategoriesOrderField, { description: 'The field to order Categories by.' })
  public field!: CategoriesOrderField;

  @Field(_type => OrderDirection, { description: 'The ordering direction.' })
  public direction!: OrderDirection;
}
