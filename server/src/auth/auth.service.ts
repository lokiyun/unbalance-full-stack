import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/models/user.model';
import { UserInputError } from 'apollo-server-express';
import { encryptPassword } from 'src/utils/cryptogram';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    console.log('location: auth.service.ts, user: ', user)
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    
    let userData: User | null = null
    if (user.email) {
      userData = await this.userService.findByEmail(user.email)

      if (!userData) {
        throw new UserInputError("邮箱不存在!")
      }
    } else {
      userData = await this.userService.findByUsername(user.username)

      if (!userData) {
        throw new UserInputError("用户不存在!")
      }
    }

    const inputPwd = encryptPassword(user.password, userData.passwd_salt)
    if (inputPwd !== userData.password) {
      throw new UserInputError("密码错误!")
    }

    const payload = { username: user.username, sub: userData._id };

    const token = this.jwtService.sign(payload)
    
    return {
      "email": userData.email,
      "username": userData.username,
      "token": token
    }
  }
}
