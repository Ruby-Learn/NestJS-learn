import { Module } from '@nestjs/common';
import { ChatModule } from './chats/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chats/chat.entity';
import { Socket } from './socket/socket.entity';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from '@nestjs/websockets/socket-module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Chat, Socket],
      charset: 'utf8mb4',
      synchronize: true,
      logging: true,
    }),
    ChatModule,
    SocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
