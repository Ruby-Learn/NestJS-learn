## class-validator
### 패키지 설치
- npm i class-validator
- npm i @nestjs/class-validator
- npm i class-transformer

### ValidationPipe Global 설정
```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(3000);
}
bootstrap();
```

### DTO 에 Class-Validator 적용
```typescript
export class UserSignUp {
  @IsNotEmpty({ message: CommonErrorMessage.INVALID_NAME })
  name: string;

  @IsEmail({ message: CommonErrorMessage.INVALID_EMAIL })
  email: string;
}
```

### Controller 의 파라미터에 커스텀 Pipe 적용
```typescript
// Custom Pipe
@Injectable()
export class IdPipe implements PipeTransform {
  isId(id: number) {
    return id > 0;
  }

  transform(id: number, metadata: ArgumentMetadata): number {
    if (this.isId(id)) {
      return id;
    }

    throw new InvalidIdException();
  }
}

// 컨트롤러의 파라미터에 검증 파이프를 직접 적용
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async userInfo(@Param('id', IdPipe) id: number) {
    return this.userService.userInfo(id);
  }
}
```