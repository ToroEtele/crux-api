// import { Expose } from 'class-transformer';
import { Field, InputType } from 'type-graphql';

import { ConnectionPredicate } from '../constants/predicates';
import { IConnectionFilterInput } from '../interfaces/connection-filter-input.interface';

@InputType()
export class ConnectionDateFilterInput implements IConnectionFilterInput<Date> {
  @Field({ nullable: true })
  // @Expose()
  public [ConnectionPredicate.ne]?: Date = undefined;

  @Field({ nullable: true })
  // @Expose()
  public [ConnectionPredicate.eq]?: Date = undefined;

  @Field({ nullable: true })
  // @Expose()
  public [ConnectionPredicate.lt]?: Date = undefined;

  @Field({ nullable: true })
  // @Expose()
  public [ConnectionPredicate.le]?: Date = undefined;

  @Field({ nullable: true })
  // @Expose()
  public [ConnectionPredicate.gt]?: Date = undefined;

  @Field({ nullable: true })
  // @Expose()
  public [ConnectionPredicate.ge]?: Date = undefined;

  @Field({ nullable: true })
  // @Expose()
  public [ConnectionPredicate.isNull]?: boolean = undefined;

  @Field((_type) => [Date], { nullable: true })
  // @Expose()
  public [ConnectionPredicate.in]?: Date[] = undefined;

  @Field((_type) => [Date], { nullable: true })
  // @Expose()
  public [ConnectionPredicate.notIn]?: Date[] = undefined;
}
