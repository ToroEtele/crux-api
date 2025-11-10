import { Field, InputType } from 'type-graphql';

import { ConnectionPredicate } from '../constants/predicates';
import { IConnectionFilterInput } from '../interfaces/connection-filter-input.interface';

@InputType()
export class ConnectionIntArrayFilterInput implements IConnectionFilterInput<number> {
  @Field({ nullable: true })
  public [ConnectionPredicate.isNull]?: boolean = undefined;
}
