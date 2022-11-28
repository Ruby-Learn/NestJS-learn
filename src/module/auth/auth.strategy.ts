import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Profile, Strategy } from 'passport-google-oauth20';
import { OAuth2User } from './auth.dto';
import { UserRepository } from '../../domain/user/user.repository';
import { Request } from 'express';
import { Payload } from './jwt/jwt.payload';
import { User } from '../../domain/user/user.entity';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): OAuth2User {
    const { id, name, emails } = profile;

    return {
      provider: 'google',
      providerId: id,
      name: name.givenName,
      email: emails[0].value,
    };
  }
}

/**
 * jwt 인증 전략
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: 'secretKey',
      ignoreExpiration: false,
    });
  }

  async validate({ email }: Payload): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (user) return user;

    throw new UnauthorizedException('사용자 인증 실패');
  }
}
