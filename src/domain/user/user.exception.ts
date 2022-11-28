import { HttpException, HttpStatus } from '@nestjs/common';

export enum UserErrorMessage {
  NOT_FOUND = '사용자 정보를 찾을 수 없습니다',
}

export class UserNotFoundException extends HttpException {
  constructor() {
    super(UserErrorMessage.NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
