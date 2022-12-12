import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';
import { ChatsGatewayLifeCycle } from './chats.gatewayLifeCycle';

@Module({
  providers: [ChatsGateway, ChatsGatewayLifeCycle],
})
export class ChatsModule {}
