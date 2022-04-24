import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DeleteUserInput {
  @Field(type => String!)
  email: string
}