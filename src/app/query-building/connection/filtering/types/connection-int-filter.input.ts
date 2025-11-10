// import { Expose } from 'class-transformer';
import { Field, InputType, Int } from 'type-graphql';

import { ConnectionPredicate } from '../constants/predicates';
import { IConnectionFilterInput } from '../interfaces/connection-filter-input.interface';

@InputType()
export class ConnectionIntFilterInput implements IConnectionFilterInput<number> {
  @Field((_type) => Int, { nullable: true })
  // @Expose()
  public [ConnectionPredicate.ne]?: number = undefined;

  @Field((_type) => Int, { nullable: true })
  // @Expose()
  public [ConnectionPredicate.eq]?: number = undefined;

  @Field((_type) => Int, { nullable: true })
  // @Expose()
  public [ConnectionPredicate.lt]?: number = undefined;

  @Field((_type) => Int, { nullable: true })
  // @Expose()
  public [ConnectionPredicate.le]?: number = undefined;

  @Field((_type) => Int, { nullable: true })
  // @Expose()
  public [ConnectionPredicate.gt]?: number = undefined;

  @Field((_type) => Int, { nullable: true })
  // @Expose()
  public [ConnectionPredicate.ge]?: number = undefined;

  @Field({ nullable: true })
  // @Expose()
  public [ConnectionPredicate.isNull]?: boolean = undefined;

  @Field((_type) => [Int], { nullable: true })
  // @Expose()
  public [ConnectionPredicate.in]?: number[] = undefined;

  @Field((_type) => [Int], { nullable: true })
  // @Expose()
  public [ConnectionPredicate.notIn]?: number[] = undefined;
}
