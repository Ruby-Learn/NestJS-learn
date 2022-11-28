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
```javascript
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
```javascript
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