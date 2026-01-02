import { Field, InputType } from 'type-graphql';
import { User } from '../user.entity';
import { Grade } from '../enums/grade.enum';

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field((_type) => String, { nullable: true })
  name?: string;

  @Field((_type) => Date, { nullable: true })
  birthDate?: Date;

  @Field((_type) => String, { nullable: true })
  country?: string;

  @Field((_type) => String, { nullable: true })
  city?: string;

  @Field((_type) => Grade, { nullable: true })
  maxGrade?: Grade;
}
