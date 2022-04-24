import { Module } from '@nestjs/common';
import { ChatResolver } from './chat.resolver';

@Module({
  imports: [],
  providers: [ChatResolver],
})
export class ChatModule {}
