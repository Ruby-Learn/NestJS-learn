import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { CustomTypeOrmModule } from '../../module/typeorm/typeorm.module';

@Module({
  imports: [CustomTypeOrmModule.forCustomRepository([UserRepository])],
  providers: [],
  controllers: [UserController],
})
export class UserModule {}
