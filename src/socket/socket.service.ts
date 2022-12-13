import { Injectable } from '@nestjs/common';
import { SocketRepository } from './socket.repository';
import { Socket } from './socket.entity';

@Injectable()
export class SocketService {
  constructor(private readonly socketRepository: SocketRepository) {}

  async login(socketId: string, username: string): Promise<Socket> {
    const socket = await this.socketRepository.findOneBy({ socketId });

    // username 을 갱신하여 저장하고 그대로 반환. 없다면 새 엔티티를 생성하여 반환
    return this.socketRepository.save({ ...socket, socketId, username });
  }

  async getUsername(socketId: string): Promise<string> {
    const socket = await this.socketRepository.findOneBy({ socketId });
    return socket.username;
  }
}
