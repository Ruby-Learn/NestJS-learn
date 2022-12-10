import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from './user.entity';

export class SignUpUser {
  @ApiProperty({
    example: 'ruby',
    description: '사용자 이름',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: 'ruby@gmail.com',
    description: '사용자 이메일',
    required: true,
  })
  email: string;
}

export class UserInfo extends PickType(User, ['id', 'name', 'email']) {}
