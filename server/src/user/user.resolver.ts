import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { GqlAuthGuard } from 'src/auth/GqlAuthGuard';
import { CurrentUser } from './currentUser.decorator';
import { Roles } from './decorators/roles.decorator';
import { DeleteUserInput } from './dto/delete-user.input';
import { NewUserInput } from './dto/new-user.input';
import { QueryUsersInput } from './dto/query-users.input';
import { User, UserLevel, UserList } from './models/user.model';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  
  @Mutation(returns => User)
  // @UseGuards(GqlAuthGuard)
  async createUser(@Args('newUserInput') newUserInput: NewUserInput): Promise<User> {
    let user = await this.userService.findByEmail(newUserInput.email)
    if (user) {
      throw new UserInputError("邮箱已存在!")
    }

    user = await this.userService.findByUsername(newUserInput.username)

    if (user) {
      throw new UserInputError("账户已存在!")
    }

    user = await this.userService.saveUser(newUserInput)
    return user
  }

  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  async currentUser(@CurrentUser() user: User) {
    const current = await this.userService.findByUsername(user.username);
    return current
  }

  @Query(returns => UserList)
  // @UseGuards(GqlAuthGuard)
  async getUsers(@Args('queryUsersInput') queryUsersInput: QueryUsersInput) {
    const current = await this.userService.getUsers({
      offset: queryUsersInput.offset,
      limit: queryUsersInput.limit
    })
    const count = await this.userService.getUsersCount()
    return {
      list: current,
      count
    }
  }

  @Mutation(returns => User)
  async removeUser(@Args('deleteUserInput') deleteUserInput: DeleteUserInput) {
    return await this.userService.removeUser(deleteUserInput)
  }
}
