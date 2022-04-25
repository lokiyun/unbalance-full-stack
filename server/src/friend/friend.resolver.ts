import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/GqlAuthGuard';
import { CurrentUser } from 'src/user/currentUser.decorator';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { NewFriendInput } from './dto/new-friend.input';
import { FriendService } from './friend.service';
import { Friend } from './models/friend.model';

@Resolver((of) => Friend)
export class FriendResolver {
  constructor(
    private readonly friendService: FriendService,
    private readonly userService: UserService,
  ) {}

  @Query((returns) => [User])
  @UseGuards(GqlAuthGuard)
  async getFriends(@CurrentUser() user: User): Promise<User[]> {
    const friends = await this.friendService.getFriendsByID(user._id);

    const result = await Promise.all(
      await friends.map(async (item) => {
        const truthFriendID =
          item.userId === user._id ? item.friendId : item.friendId;
        return await this.userService.findByID(truthFriendID);
      }),
    );
    return result
  }

  @Mutation((returns) => Friend)
  @UseGuards(GqlAuthGuard)
  async createFriend(
    @CurrentUser() user: User,
    @Args('newFriendInput') newFriendInput: NewFriendInput,
  ): Promise<Friend> {
    return this.friendService.saveFriend(user, newFriendInput);
  }
}
