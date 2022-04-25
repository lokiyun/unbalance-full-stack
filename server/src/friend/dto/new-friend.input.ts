import { Field, ID, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Length, MaxLength, ValidateIf } from 'class-validator';

@InputType()
export class NewFriendInput {
  @Field(type => ID)
  id: string
}