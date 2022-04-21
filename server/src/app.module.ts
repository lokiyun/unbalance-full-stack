import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module'
import { UserModule } from './user/user.module'
import { authDirectiveTransformer } from './common/directives/auth.directive';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://192.168.163.128/blog'),
    HelloModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "index.gql",
      context: ({ req }) => {
        return {
          token: req.headers.authorization || ''
        }
      },
      transformSchema: schema => authDirectiveTransformer(schema, 'auth'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'auth',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
