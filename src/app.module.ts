import { Module } from '@nestjs/common';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [ChatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
