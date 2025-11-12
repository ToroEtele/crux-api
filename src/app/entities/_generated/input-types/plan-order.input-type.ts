// This file was generated automatically.
// All manual modifications will be lost!
import { InputType } from 'type-graphql';

import { OrderDirection } from '../../../query-building/sorting/constants/order-direction.enum';
import { ISort } from '../../../query-building/sorting/interfaces/sort.interface';
import { Field } from '../../_common/decorators/field.decorator';
import { PlansOrderField } from '../constants/plan-order-field.enum';

@InputType()
export class PlansOrderInput implements ISort {
  @Field(_type => PlansOrderField, { description: 'The field to order Plans by.' })
  public field!: PlansOrderField;

  @Field(_type => OrderDirection, { description: 'The ordering direction.' })
  public direction!: OrderDirection;
}
