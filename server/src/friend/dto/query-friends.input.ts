import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class QueryFriendsInput {
  @Field(type => String)
  id: string

}