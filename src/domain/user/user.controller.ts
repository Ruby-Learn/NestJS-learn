import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignUp } from './user.dto';
import { IdPipe } from '../../common/common.validator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signUp(@Body() userSignUp: UserSignUp, @Res() res) {
    await this.userService.signUp(userSignUp);
    return res.end();
  }

  @Get(':id')
  async userInfo(@Param('id', IdPipe) id: number) {
    return this.userService.userInfo(id);
  }
}
