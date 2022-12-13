import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { SocketRepository } from '../socket/socket.repository';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly socketRepository: SocketRepository,
  ) {}

  async addChat(socketId: string, chatting: string): Promise<string> {
    const socket = await this.socketRepository.findOneBy({ socketId });

    await this.chatRepository.save({ chatting, socket });

    return socket.username;
  }
}
