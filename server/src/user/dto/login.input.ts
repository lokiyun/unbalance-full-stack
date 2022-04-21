import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Length, MaxLength, ValidateIf } from 'class-validator';

@InputType()
export class LoginInput {
  @Field({ nullable: true })
  @ValidateIf(o => o.username === "")
  @MaxLength(30)
  email: string

  @Field({ nullable: true })
  @ValidateIf(o => o.email === "")
  @Length(2, 16)
  username: string

  @Field()
  @Length(8, 16)
  password: string
}