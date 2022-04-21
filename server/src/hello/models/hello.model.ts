import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'hello' })
export class Hello {
  @Field(type => ID)
  id: string

  @Field()
  @Directive('@upper')
  title: string
}