import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { OAuth2User } from './auth.dto';
import { Payload } from './jwt/jwt.payload';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() { user }, @Res() res) {
    // 구글 인증 성공시 구글의 사용자 정보에 업데이트된 정보가 있다면 그 정보로 DB 에 있는 정보를 갱신시킨다.
    const oAuthUser = await this.authService.authLogin(user as OAuth2User);

    const token = this.jwtService.sign({ ...oAuthUser } as Payload);

    // JWT 토큰을 쿠키에 추가
    res.cookie('Authentication', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
    });

    return res.status(HttpStatus.OK);
  }

  // 로그아웃은 프론트 쪽에서 토큰을 제거하는 것으로 처리함
}
