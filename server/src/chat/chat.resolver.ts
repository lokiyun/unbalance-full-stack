import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/GqlAuthGuard';
import { Chat } from './models/chat.modoel';
import { CurrentUser } from '../user/currentUser.decorator';
import { User } from 'src/user/models/user.model';
import { PubSub } from 'graphql-subscriptions';
import { CreateMessageInput } from './dto/create-message.input';

const pubSub = new PubSub();

@Resolver('Chat')
export class ChatResolver {
  constructor() {}

  @Query(returns => [Chat])
  async getNotReadMessages(@CurrentUser() user: User) {
    console.log('getNotReadMessages')
    return []
  }

  @Mutation(returns => Chat)
  async createMessage(@Args('createMessageInput') args: CreateMessageInput): Promise<Chat> {
    pubSub.publish('messageSent', { messageSent: args });
    return args
  }

  @Subscription(returns => Chat, {
    filter: (payload, variables) => {
      return payload.messageSent.to === variables.username
    }
  })
  messageSent(@Args('username') username: string) {
    return pubSub.asyncIterator('messageSent');
  }
}