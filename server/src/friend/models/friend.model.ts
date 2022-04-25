import { Directive, Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type FriendDocument = Friend & Document;


@Schema()
@ObjectType({ description: 'user' })
export class Friend {
  _id?: string

  @Field(type => ID)
  @Prop()
  userId: string

  @Field(type => ID)
  @Prop()
  friendId: string

}

export const FriendSchema = SchemaFactory.createForClass(Friend);