import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateMessageInput {
  @Field(type => String!)
  from: string

  @Field(type => String!)
  to: string

  @Field(type => String)
  type: string

  @Field(type => String)
  message: string
}
