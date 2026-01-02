// This file was generated automatically.
// All manual modifications will be lost!
import { InputType } from 'type-graphql';

import { OrderDirection } from '../../../query-building/sorting/constants/order-direction.enum';
import { ISort } from '../../../query-building/sorting/interfaces/sort.interface';
import { Field } from '../../_common/decorators/field.decorator';
import { WorkoutsOrderField } from '../constants/workout-order-field.enum';

@InputType()
export class WorkoutsOrderInput implements ISort {
  @Field(_type => WorkoutsOrderField, { description: 'The field to order Workouts by.' })
  public field!: WorkoutsOrderField;

  @Field(_type => OrderDirection, { description: 'The ordering direction.' })
  public direction!: OrderDirection;
}
