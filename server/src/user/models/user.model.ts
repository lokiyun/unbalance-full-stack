import { Directive, Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

export enum UserLevel {
  visitor = "visitor",
  normal = "normal",
  manager = "manager"
}

registerEnumType(UserLevel, {
  name: 'userLevel'
})

@Schema()
@ObjectType({ description: 'user' })
export class User {
  _id?: string

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

  @Field()
  token?: string

  @Field({ nullable: true })
  isOnline?: boolean

}

@ObjectType({ description: 'userlist' })
export class UserList {
  @Field(type => [User], { nullable: true })
  list: User[]

  @Field(type => Int, { nullable: true })
  count: number
}

export const UserSchema = SchemaFactory.createForClass(User);