## CORS
- Cross-Origin Resource Sharing. 교차 출처 자원 공유
- 웹 페이지 상의 제한된 리소스를 최초 자원이 서비스된 도메인 외의 다른 도메인으로부터 요청할 수 있게 허용하는 구조
  - 일반적으로는 특정 교차 도메인간 요청은 동일 출처 보안 정책에 의해 기본적으로 금지되어 있음
  - 최근에는 프론트엔드 서버에서 제공한 웹 페이지에서 다른 백엔드 서버로부터 자원을 제공하는 형태가 많아 CORS 설정을 해주어야 함

### CORS 설정
```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173/',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
```