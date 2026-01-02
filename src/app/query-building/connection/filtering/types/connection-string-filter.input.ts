 
// import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Field, InputType, Maybe } from 'type-graphql';

import { ConnectionPredicate } from '../constants/predicates';
import { IConnectionFilterInput } from '../interfaces/connection-filter-input.interface';

@InputType()
export class ConnectionStringFilterInput implements IConnectionFilterInput<string> {
  @Field((_type) => String, { nullable: true })
  // @Expose()
  @IsOptional()
  public [ConnectionPredicate.ne]?: Maybe<string> = undefined;

  @Field((_type) => String, { nullable: true })
  // @Expose()
  @IsOptional()
  public [ConnectionPredicate.eq]?: Maybe<string> = undefined;

  @Field((_type) => String, { nullable: true })
  // @Expose()
  @IsOptional()
  @IsNotEmpty()
  public [ConnectionPredicate.beginsWith]?: Maybe<string> = undefined;

  @Field((_type) => String, { nullable: true })
  // @Expose()
  @IsOptional()
  @IsNotEmpty()
  public [ConnectionPredicate.endsWith]?: Maybe<string> = undefined;

  @Field((_type) => String, { nullable: true })
  // @Expose()
  @IsOptional()
  @IsNotEmpty()
  public [ConnectionPredicate.contains]?: Maybe<string> = undefined;

  @Field((_type) => String, { nullable: true })
  // @Expose()
  @IsOptional()
  @IsNotEmpty()
  public [ConnectionPredicate.notContains]?: Maybe<string> = undefined;

  @Field((_type) => String, { nullable: true })
  // @Expose()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(10_000)
  public [ConnectionPredicate.matchesRegex]?: Maybe<string> = undefined;

  @Field((_type) => String, { nullable: true })
  // @Expose()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(10_000)
  public [ConnectionPredicate.notMatchesRegex]?: Maybe<string> = undefined;

  @Field({ nullable: true })
  // @Expose()
  public [ConnectionPredicate.isNull]?: boolean = undefined;

  @Field({ nullable: true })
  // @Expose()
  public [ConnectionPredicate.isEmpty]?: boolean = undefined;

  @Field((_type) => [String], { nullable: true })
  // @Expose()
  public [ConnectionPredicate.in]?: string[] = undefined;

  @Field((_type) => [String], { nullable: true })
  // @Expose()
  public [ConnectionPredicate.notIn]?: string[] = undefined;
}

/**
 * Special use-case for Elasticsearch flattened field type and custom metrics. The groups option on the Expose decorator
 * doesn't skip properties without the group when transforming from plain object to class instance.
 */
export class ConnectionFlattenedFieldStringFilterInput implements IConnectionFilterInput<string> {
  // @Expose()
  @IsOptional()
  public [ConnectionPredicate.ne]?: Maybe<string> = undefined;

  // @Expose()
  @IsOptional()
  public [ConnectionPredicate.eq]?: Maybe<string> = undefined;

  // @Expose()
  @IsOptional()
  @IsNotEmpty()
  public [ConnectionPredicate.beginsWith]?: Maybe<string> = undefined;

  // @Expose()
  @IsOptional()
  @IsNotEmpty()
  public [ConnectionPredicate.contains]?: Maybe<string> = undefined;

  // @Expose()
  @IsOptional()
  @IsNotEmpty()
  public [ConnectionPredicate.notContains]?: Maybe<string> = undefined;

  // @Expose()
  public [ConnectionPredicate.isNull]?: boolean = undefined;

  // @Expose()
  public [ConnectionPredicate.isEmpty]?: boolean = undefined;

  // @Expose()
  public [ConnectionPredicate.in]?: string[] = undefined;

  // @Expose()
  public [ConnectionPredicate.notIn]?: string[] = undefined;
}
