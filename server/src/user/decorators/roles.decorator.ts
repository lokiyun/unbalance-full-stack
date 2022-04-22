import { SetMetadata } from '@nestjs/common';
import { UserLevel } from '../models/user.model';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserLevel[]) => SetMetadata(ROLES_KEY, roles);