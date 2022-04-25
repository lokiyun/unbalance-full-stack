import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/roles.guard';
import { ChatModule } from './chat/chat.module';
import { FriendModule } from './friend/friend.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://192.168.163.128/blog'),
    UserModule,
    AuthModule,
    ChatModule,
    FriendModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      cors: {
        origin: '*',
        credentials: true,
      },
      path: "/graphql",
      subscriptions: {
        'graphql-ws': {
          path: "/sub",
          onConnect: (connectionParams) => {
            console.log('subscriptions-transport-ws open', connectionParams)
            return {}
          }
        },
        'subscriptions-transport-ws': {
          onConnect: (connectionParams) => {
            console.log('subscriptions-transport-ws open', connectionParams)
            return {}
          }
        }
      },
      // playground: false,
      autoSchemaFile: "index.gql",
      context: ({ req }) => ({ req }),
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})

export class AppModule {}
