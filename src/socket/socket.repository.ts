import { CustomRepository } from '../typeorm/typeorm.decorator';
import { Socket } from './socket.entity';
import { Repository } from 'typeorm';

@CustomRepository(Socket)
export class SocketRepository extends Repository<Socket> {}
