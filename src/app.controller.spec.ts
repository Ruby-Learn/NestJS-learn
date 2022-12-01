import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import * as request from 'supertest';
import {
  CACHE_MANAGER,
  CacheModule,
  HttpStatus,
  INestApplication,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as redisStore from 'cache-manager-ioredis';
import { AppModule } from './app.module';

describe('AppController', () => {
  let app: INestApplication;
  let appController: AppController;
  let cacheManager: Cache;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register({
          store: redisStore,
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
          ttl: +process.env.REDIS_TTL,
          isGlobal: true,
        }),
        AppModule,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    appController = module.get<AppController>(AppController);
    cacheManager = module.get(CACHE_MANAGER);
  });

  describe('Redis 캐시 테스트', () => {
    describe('캐시에 데이터 저장', () => {
      test('캐시에 데이터 저장', async () => {
        await request(app.getHttpServer())
          .get('/cache/setCache')
          .expect(HttpStatus.OK);

        const cacheData = await cacheManager.get('cache');
        expect(cacheData).toEqual('data');
      });
    });

    describe('캐시에 데이터 조회', () => {
      describe('캐시에 데이터가 없을 경우', () => {
        beforeAll(async () => {
          await cacheManager.reset();
        });

        test('캐시에 데이터가 없을 경우', async () => {
          const res = await request(app.getHttpServer())
            .get('/cache/getCache')
            .expect(HttpStatus.OK);

          expect(res.body.data).toEqual('NotFound Data');
        });
      });

      describe('캐시에 데이터가 있을 경우', () => {
        beforeAll(async () => {
          await cacheManager.set('cache', 'data');
        });

        test('캐시에 데이터가 있을 경우 저장되어 있는 데이터 조회', async () => {
          const res = await request(app.getHttpServer())
            .get('/cache/getCache')
            .expect(HttpStatus.OK);

          expect(res.body.data).toEqual('data');
        });
      });
    });
  });

  describe('캐시 데이터 초기화', () => {
    beforeAll(async () => {
      await cacheManager.set('cache', 'data');
    });

    test('캐시 데이터 초기화', async () => {
      await request(app.getHttpServer())
        .get('/cache/resetCache')
        .expect(HttpStatus.OK);

      const cacheData = await cacheManager.get('cache');
      expect(cacheData).toBeNull();
    });
  });
});
