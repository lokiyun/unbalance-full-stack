import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { FriendResolver } from './friend.resolver';
import { FriendService } from './friend.service';
import { Friend, FriendSchema } from './models/friend.model';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Friend.name, schema: FriendSchema }]),
  ],
  providers: [FriendResolver, FriendService],
  exports: []
})
export class FriendModule {}
