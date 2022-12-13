import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatGatewayLifeCycle } from './chat.gatewayLifeCycle';
import { CustomTypeOrmModule } from '../typeorm/typeorm.module';
import { ChatRepository } from './chat.repository';
import { SocketRepository } from '../socket/socket.repository';
import { ChatService } from './chat.service';
import { SocketService } from '../socket/socket.service';

@Module({
  imports: [
    CustomTypeOrmModule.forCustomRepository([ChatRepository, SocketRepository]),
  ],
  providers: [ChatGateway, ChatGatewayLifeCycle, ChatService, SocketService],
})
export class ChatModule {}
