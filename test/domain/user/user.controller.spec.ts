import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../src/domain/user/user.entity';
import { UserRepository } from '../../../src/domain/user/user.repository';
import { UserModule } from '../../../src/domain/user/user.module';
import { CustomTypeOrmModule } from '../../../src/module/typeorm/typeorm.module';
import * as request from 'supertest';
import { CommonErrorMessage } from '../../../src/common/common.message';

describe('FreelancerController', () => {
  let app: INestApplication;
  let user: User;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
          entities: [User],
          charset: 'utf8mb4',
          synchronize: true,
          logging: true,
        }),
        UserModule,
        CustomTypeOrmModule.forCustomRepository([UserRepository]),
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();

    const userRepository = module.get<UserRepository>(UserRepository);
    await userRepository.delete({});
    user = await userRepository.save({
      name: 'ruby',
      email: 'ruby@gmail.com',
    });
  });

  describe('class-validator 검증 테스트', () => {
    test('Validation 형식에 맞지 않을 경우 예외 처리', async () => {
      const res = await request(app.getHttpServer())
        .post('/users')
        .send({
          name: '',
          email: 'asdasd',
        })
        .expect(HttpStatus.BAD_REQUEST);

      const errorMessages = res.body.message;
      expect(errorMessages).toContain(CommonErrorMessage.INVALID_NAME);
      expect(errorMessages).toContain(CommonErrorMessage.INVALID_EMAIL);
    });

    test('Validation 형식에 적합할 경우 요청 성공', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'dia',
          email: 'dia@gmail.com',
        })
        .expect(HttpStatus.CREATED);
    });
  });

  describe('IsId Pipe 검증 테스트', () => {
    describe('Validation 형식에 맞지 않을 경우 예외 처리', () => {
      test('id 값이 숫자가 아닐 경우 예외 처리', async () => {
        const id = 'asd';
        const res = await request(app.getHttpServer())
          .get(`/users/${id}`)
          .expect(HttpStatus.BAD_REQUEST);

        const errorMessage = res.body.message;

        expect(errorMessage).toEqual(CommonErrorMessage.INVALID_ID);
      });

      test('id 값이 0 이하일 경우 예외 처리', async () => {
        const id = -2;
        const res = await request(app.getHttpServer())
          .get(`/users/${id}`)
          .expect(HttpStatus.BAD_REQUEST);

        const errorMessage = res.body.message;

        expect(errorMessage).toEqual(CommonErrorMessage.INVALID_ID);
      });
    });

    test('id 값이 정상 값일 경우 응답', async () => {
      const id = user.id;
      const res = await request(app.getHttpServer())
        .get(`/users/${id}`)
        .expect(HttpStatus.OK);

      const findUser = res.body;

      expect(findUser.id).toEqual(user.id);
      expect(findUser.name).toEqual(user.name);
      expect(findUser.email).toEqual(user.email);
    });
  });
});
