import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { HelloModule } from './hello/hello.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://192.168.163.128/blog'),
    HelloModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "index.gql",
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
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
