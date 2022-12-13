import { Module } from '@nestjs/common';
import { CustomTypeOrmModule } from '../typeorm/typeorm.module';
import { SocketRepository } from './socket.repository';
import { ChatRepository } from '../chats/chat.repository';
import { ChatService } from '../chats/chat.service';

@Module({
  imports: [
    CustomTypeOrmModule.forCustomRepository([ChatRepository, SocketRepository]),
  ],
  providers: [ChatService],
})
export class ChatModule {}
