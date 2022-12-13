import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

// Socket 생명주기
@WebSocketGateway({ namespace: 'chatsGatewayInit' })
export class ChatGatewayLifeCycle
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  // Gateway 객체가 생성 후 실행됨
  afterInit(server: any): any {
    this.logger.log('gateway init');
  }

  // 클라이언트와 연결이 되었을 때 작동
  handleConnection(@ConnectedSocket() socket: Socket): any {
    this.logger.log(`connect : ${socket.id}`);
  }

  // 클라이언트와 연결이 종료되었을 때 작동
  handleDisconnect(@ConnectedSocket() socket: Socket): any {
    this.logger.log(`disconnect : ${socket.id}`);
  }
}
