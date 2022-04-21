import { Injectable } from '@nestjs/common';
import { NewUserInput } from './dto/new-user.input';
import { Model } from 'mongoose';
import { User, UserDocument, UserLevel } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // 保存用户
  async saveUser(data: NewUserInput): Promise<User> {

    data.isBan = false
    const salt = makeSalt()
    data.password = encryptPassword(data.password, salt)
    data.passwd_salt = salt
    data.user_level = UserLevel.T
    const createdUser = new this.userModel(data)
    return createdUser.save()
  }

  // 根据邮箱查找用户
  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      email
    })
  }

  // 根据用户名查找用户
  async findByUsername(username:string): Promise<User> {
    return this.userModel.findOne({
      username
    })
  }

  async updateUser(userId, data): Promise<User> {
    return this.userModel.findOneAndUpdate(
      {
        _id: userId,
      },
      data,
      {
        new: true
      }
    )
  }
}
