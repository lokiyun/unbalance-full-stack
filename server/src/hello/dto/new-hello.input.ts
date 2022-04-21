import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class NewHelloInput {
  @Field()
  @MaxLength(30)
  title: string;
}