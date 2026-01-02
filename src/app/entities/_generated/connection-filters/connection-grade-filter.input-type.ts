// This file was generated automatically.
// All manual modifications will be lost!
import { Field, InputType } from 'type-graphql';

import { IConnectionFilterInput } from '../../../query-building/connection/filtering/interfaces/connection-filter-input.interface';
import { Grade } from '../../user/enums/grade.enum';

@InputType()
export class ConnectionGradeFilterInput implements IConnectionFilterInput<Grade> {
  @Field(_type => Grade, { nullable: true })
  public eq?: Grade;

  @Field(_type => [Grade], { nullable: true })
  public in?: Grade[];

  @Field(_type => Grade, { nullable: true })
  public ne?: Grade;

  @Field(_type => [Grade], { nullable: true })
  public notIn?: Grade[];

  @Field({ nullable: true })
  public isNull?: boolean;
}
