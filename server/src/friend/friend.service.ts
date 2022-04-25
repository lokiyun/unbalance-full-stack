import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Friend, FriendDocument } from './models/friend.model';
import { Model } from 'mongoose';
import { QueryFriendsInput } from './dto/query-friends.input';
import { NewFriendInput } from './dto/new-friend.input';
import { CurrentUser } from 'src/user/currentUser.decorator';
import { User } from 'src/user/models/user.model';

@Injectable()
export class FriendService {
  constructor(
    @InjectModel(Friend.name) private friendModel: Model<FriendDocument>,
  ) {}

  async getFriendsByID(id: string): Promise<Friend[]> {
    const friends = await this.friendModel.find({
      userId: id
    });
    const otherFriend = await this.friendModel.find({
      friendId: id
    })
    return friends.concat(otherFriend);
  }

  // 保存好友
  async saveFriend(user: User, data: NewFriendInput): Promise<Friend> {
    console.log('user: ', user)
    console.log('friend', data)
    const createdFriend = new this.friendModel({
      userId: user._id,
      friendId: data.id,
    });
    const friend = createdFriend.save();
    return friend;
  }
}
