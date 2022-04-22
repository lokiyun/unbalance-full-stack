import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/user/models/user.model';
import { LoginInput } from 'src/user/dto/login.input';

@Resolver(of => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => User)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const user = await this.authService.login(loginInput)
    return user
  }
}
