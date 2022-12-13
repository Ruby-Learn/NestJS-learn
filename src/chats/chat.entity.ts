import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Socket } from '../socket/socket.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatting: string;

  @ManyToOne(() => Socket)
  socket: Socket;
}
