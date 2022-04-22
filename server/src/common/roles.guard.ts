import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CurrentUser } from 'src/user/currentUser.decorator';
import { ROLES_KEY } from 'src/user/decorators/roles.decorator';
import { User, UserLevel } from 'src/user/models/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
  public innerUser: User

  constructor(private reflector: Reflector, ) {}
  
  canActivate(context: ExecutionContext): boolean {
    return true
  }
}
