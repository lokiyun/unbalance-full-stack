import { Directive, Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

export enum UserLevel {
  T = -1,
  N = 1,
  M = 0
}

registerEnumType(UserLevel, {
  name: 'userLevel'
})

@Schema()
@ObjectType({ description: 'user' })
export class User {
  @Field({ nullable: true })
  @Prop({ required: true })
  email?: string

  @Field({ nullable: true })
  @Prop({ required: true })
  username?: string

  @Field({ nullable: true })
  @Prop({ required: true })
  password?: string

  @Field({ nullable: true })
  @Prop()
  avatar?: string

  @Field({ nullable: true })
  @Prop()
  isBan?: boolean

  @Field(type => UserLevel, { nullable: true })
  @Prop()
  user_level?: UserLevel

  @Prop()
  passwd_salt?: string 
}

export const UserSchema = SchemaFactory.createForClass(User);