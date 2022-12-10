import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { SignUpUser, UserInfo } from './user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @Post()
  async postUser(@Body() signUpUser: SignUpUser) {
    console.log(signUpUser);
    await this.userRepository.insert({ ...signUpUser });
  }

  @ApiOperation({ summary: '회원 정보 조회' })
  @ApiResponse({
    status: 200,
    description: '회원 상세 정보',
    type: UserInfo,
  })
  @ApiResponse({
    status: 404,
    description: '회원 정보가 존재하지 않음',
  })
  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserInfo> {
    return this.userRepository.findOneBy({ id });
  }
}
