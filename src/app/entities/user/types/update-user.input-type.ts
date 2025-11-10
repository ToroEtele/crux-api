import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateUserInput {
  @Field((_type) => String, { nullable: true })
  name?: string;
}
