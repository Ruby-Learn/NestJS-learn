## TypeORM
### 패키지 설치
- npm i @nestjs/config
  - .env 파일에 설정한 환경변수를 사용하기 위한 패키지
- npm install mysql2
  - MySQL 연결을 위한 패키지
- npm i typeorm
  - TypeORM 사용을 위한 패키지
- npm i @nestjs/typeorm
  - typeScript 에서 TypeORM 을 사용하기 위한 패키지

### 엔티티 생성
```typescript
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
```

### TypeORM 설정
```typescript
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
      entities: [User],
      charset: 'utf8mb4',
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### 커스텀 리포지토리
- CustomTypeOrmModule 설정
```typescript
export class CustomTypeOrmModule {
  public static forCustomRepository<T extends new (...args: any[]) => any>(
    repositories: T[],
  ): DynamicModule {
    const providers: Provider[] = [];

    for (const repository of repositories) {
      const entity = Reflect.getMetadata(
        TYPEORM_EX_CUSTOM_REPOSITORY,
        repository,
      );

      if (!entity) {
        continue;
      }

      providers.push({
        inject: [getDataSourceToken()],
        provide: repository,
        useFactory: (dataSource: DataSource): typeof repository => {
          const baseRepository = dataSource.getRepository<any>(entity);
          return new repository(
            baseRepository.target,
            baseRepository.manager,
            baseRepository.queryRunner,
          );
        },
      });
    }

    return {
      exports: providers,
      module: CustomTypeOrmModule,
      providers,
    };
  }
}
```

- CustomRepository 데코레이터
```typescript
export const TYPEORM_EX_CUSTOM_REPOSITORY = 'TYPEORM_EX_CUSTOM_REPOSITORY';

export function CustomRepository(entity: Function): ClassDecorator {
  return SetMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, entity);
}
```

- CustomRepository 데코레이터 사용
```typescript
@CustomRepository(User)
export class UserRepository extends Repository<User> {}
```