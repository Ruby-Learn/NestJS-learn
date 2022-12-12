import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'customSpace' }) // namespace 지정. 해당 namespace 와 동일한 소켓의 클라이언트들에 요청과 응답을 처리한다.
export class ChatsGateway {
  @SubscribeMessage('uniCasting') // 클라이언트 쪽에서 socket.emit 을 통해 해당 이벤트를 지정하여 전송하며 서버쪽에서 이벤트를 처리
  handleUniCastMessage(
    @MessageBody() data: string, // 클라이언트에서 보낸 데이터
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(`socket.id : ${socket.id}`); // 연결된 클라이언트마다 socketId가 다르게 부여된다.

    // 요청을 보낸 socketId 에 해당하는 클라이언트에게 전송
    socket.emit(`${socket.id} 의 메시지 : ${data}`);
  }

  @SubscribeMessage('broadCasting')
  handleBroadCastMessage(
    @MessageBody() data: string, // 클라이언트에서 보낸 데이터
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(`socket.id : ${socket.id}`); // 연결된 클라이언트마다 socketId가 다르게 부여된다.

    // 연결된 모든 클라이언트들에게 전송
    socket.broadcast.emit(`${socket.id} 의 메시지 : ${data}`);
  }
}
