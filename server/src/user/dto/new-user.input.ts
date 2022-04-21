import { Field, InputType } from '@nestjs/graphql';
import { Length, MaxLength } from 'class-validator';
import { UserLevel } from '../models/user.model';

@InputType()
export class NewUserInput {
  @Field()
  @MaxLength(30)
  email: string

  @Field()
  @Length(2, 16)
  username: string

  @Field()
  @Length(8, 16)
  password: string

  @Field({ nullable: true })
  avatar: string

  @Field({ nullable: true })
  isBan: boolean

  @Field({ nullable: true })
  passwd_salt: string

  @Field({ nullable: true })
  user_level?: UserLevel
}