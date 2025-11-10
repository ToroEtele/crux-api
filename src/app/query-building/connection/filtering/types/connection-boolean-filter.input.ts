// import { Expose } from 'class-transformer';
import { Field, InputType } from 'type-graphql';

import { ConnectionPredicate } from '../constants/predicates';
import { IConnectionFilterInput } from '../interfaces/connection-filter-input.interface';

@InputType()
export class ConnectionBooleanFilterInput implements IConnectionFilterInput<boolean> {
  @Field({ nullable: true })
  // @Expose()
  public [ConnectionPredicate.ne]?: boolean = undefined;

  @Field({ nullable: true })
  // @Expose()
  public [ConnectionPredicate.eq]?: boolean = undefined;

  @Field({ nullable: true })
  // @Expose()
  public [ConnectionPredicate.isNull]?: boolean = undefined;
}
