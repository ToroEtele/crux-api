// This file was generated automatically.
// All manual modifications will be lost!
import { InputType } from 'type-graphql';

import { OrderDirection } from '../../../query-building/sorting/constants/order-direction.enum';
import { ISort } from '../../../query-building/sorting/interfaces/sort.interface';
import { Field } from '../../_common/decorators/field.decorator';
import { ExercisesOrderField } from '../constants/exercise-order-field.enum';

@InputType()
export class ExercisesOrderInput implements ISort {
  @Field(_type => ExercisesOrderField, { description: 'The field to order Exercises by.' })
  public field!: ExercisesOrderField;

  @Field(_type => OrderDirection, { description: 'The ordering direction.' })
  public direction!: OrderDirection;
}
