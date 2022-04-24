import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class QueryUsersInput {
  @Field(type => Int)
  offset?: number

  @Field(type => Int)
  limit?: number
}