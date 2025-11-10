import { Field, InputType } from 'type-graphql';

@InputType()
export class SignUpInput {
  @Field((_type) => String)
  firstName!: string;

  @Field((_type) => String)
  lastName!: string;

  @Field((_type) => String)
  email!: string;

  @Field((_type) => String)
  password!: string;
}
