import { Field, InputType } from 'type-graphql';

import { IConnectionFilterInput } from '../interfaces/connection-filter-input.interface';
import { ConnectionPredicate } from '../constants/predicates';

@InputType()
export class ConnectionStringArrayFilterInput implements IConnectionFilterInput<string> {
  @Field((_type) => String, { nullable: true })
  public [ConnectionPredicate.arrayContainsLike]?: string = undefined;

  @Field((_type) => String, { nullable: true })
  public [ConnectionPredicate.arrayNotContainsLike]?: string = undefined;

  @Field({ nullable: true })
  public [ConnectionPredicate.isNull]?: boolean = undefined;
}
