import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http.exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { ApiParamsValidationPipe } from './pipe/api.params.validation.pipe';
import { AuthGuard } from './guard/auth.guard';
import { GlobalMidWare } from './middlewares/global.middleware';
import { Completed } from './base/completed';
import { Start } from './base/init';
import './global/global-lib';

async function bootstrap() {
  Start();
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor(new Reflector()));
  app.useGlobalPipes(new ApiParamsValidationPipe());
  app.useGlobalGuards(new AuthGuard(new Reflector()));
  app.use(GlobalMidWare);
  Completed(app);
  await app.listen(3000);
}
bootstrap();
