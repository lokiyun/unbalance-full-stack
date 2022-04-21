import { Args, Directive, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { UserInputError } from 'apollo-server-express';
import { encryptPassword } from 'src/utils/cryptogram';
import { LoginInput } from './dto/login.input';
import { NewUserInput } from './dto/new-user.input';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { jwtConstants } from 'src/utils/constants';
import { sign } from 'jsonwebtoken'

const genToken = async (id) => {
  const token = await sign({
    userId: id,
  }, jwtConstants.secret, {
    expiresIn: 60 * 60 * 24
  })
  return token
}

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService,  private readonly jwtService: JwtService) {}

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

  @Mutation(returns => User)
  async login(@Args('loginInput') loginInput: LoginInput) {
    let userData: User | null = null
    if (loginInput.email) {
      userData = await this.userService.findByEmail(loginInput.email)

      if (!userData) {
        throw new UserInputError("邮箱不存在!")
      }
    } else {
      userData = await this.userService.findByUsername(loginInput.username)

      if (!userData) {
        throw new UserInputError("用户不存在!")
      }
    }

    const inputPwd = encryptPassword(loginInput.password, userData.passwd_salt)
    if (inputPwd !== userData.password) {
      throw new UserInputError("密码错误!")
    }

    const token = genToken(userData._id)
    
    return {
      "email": userData.email,
      "username": userData.username,
      "token": token
    }
    

    
  }

}
