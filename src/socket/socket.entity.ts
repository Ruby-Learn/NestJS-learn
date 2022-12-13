import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Socket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  socketId: string;

  @Column()
  username: string;
}
