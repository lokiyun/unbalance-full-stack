import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { GqlAuthGuard } from 'src/auth/GqlAuthGuard';
import { CurrentUser } from './currentUser.decorator';
import { LoginInput } from './dto/login.input';
import { NewUserInput } from './dto/new-user.input';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(returns => User)
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
    console.log(user)
    const current = await this.userService.findByUsername(user.username);
    return current
  }
}
