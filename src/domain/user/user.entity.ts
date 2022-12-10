import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({
    example: 1,
    description: '사용자 ID',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'ruby',
    description: '사용자 이름',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'ruby@gmail.com',
    description: '사용자 이메일',
  })
  @Column()
  email: string;
}
