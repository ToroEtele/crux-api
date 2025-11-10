import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export class PaginationArgs {
  @Field((_type) => Int, { defaultValue: 10, nullable: true })
  take!: number

  @Field((_type) => Int, { defaultValue: 0, nullable: true })
  skip!: number
}
