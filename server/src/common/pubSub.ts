import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PubSub } from 'graphql-subscriptions'

@Injectable()
export class IPubSub implements CanActivate {
  public pubSub: PubSub

  constructor(private reflector: Reflector) {}
  
  canActivate(context: ExecutionContext): boolean {
    return true
  }
}