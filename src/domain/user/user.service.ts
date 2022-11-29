import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserSignUp } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp({ name, email }: UserSignUp) {
    return this.userRepository.insert({ name, email });
  }

  async userInfo(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}
