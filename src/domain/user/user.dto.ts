import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';
import { CommonErrorMessage } from '../../common/common.message';

export class UserSignUp {
  @IsNotEmpty({ message: CommonErrorMessage.INVALID_NAME })
  name: string;

  @IsEmail({ message: CommonErrorMessage.INVALID_EMAIL })
  email: string;
}
