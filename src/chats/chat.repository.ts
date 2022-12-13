import { CustomRepository } from '../typeorm/typeorm.decorator';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';

@CustomRepository(Chat)
export class ChatRepository extends Repository<Chat> {}
