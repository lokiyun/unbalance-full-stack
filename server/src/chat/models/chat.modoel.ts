import { Directive, Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType({ description: 'userlist' })
export class Chat {
  @Field(type => String!)
  from: string

  @Field(type => String!)
  to: string

  @Field(type => String)
  type: string

  @Field(type => String)
  message: string
}

export const UserSchema = SchemaFactory.createForClass(Chat);