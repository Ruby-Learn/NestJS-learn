import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CustomTypeOrmModule } from '../../module/typeorm/typeorm.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [CustomTypeOrmModule.forCustomRepository([UserRepository])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
