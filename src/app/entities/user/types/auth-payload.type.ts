import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AuthPayload {
  @Field((_type) => String)
  accessToken: string;

  @Field((_type) => String)
  refreshToken: string;
}
