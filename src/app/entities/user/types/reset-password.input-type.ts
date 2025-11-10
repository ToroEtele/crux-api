import { Field, InputType } from 'type-graphql';

@InputType()
export class ResetPasswordInput {
  @Field((_type) => String)
  token: string;

  @Field((_type) => String)
  password: string;
}
