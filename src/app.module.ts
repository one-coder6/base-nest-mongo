import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonMiddleware } from './middlewares/common.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { MongooseConfigService } from './config/mongoose.service';

const options = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useClass: MongooseConfigService,
};
@Module({
  imports: [MongooseModule.forRootAsync(options), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CommonMiddleware).forRoutes('/');
  }
}
