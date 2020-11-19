import {
  Injectable,
  OnModuleInit,
  OnApplicationBootstrap,
} from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit, OnApplicationBootstrap {
  onModuleInit() {
    console.log(`The app module has been initialized`);
  }

  onApplicationBootstrap() {
    console.log(`The app module has been started`);
  }

  getHello(): string {
    return 'Hello World!';
  }

  getDefault(): any {
    return [{ name: 'mr.one' }];
  }
}
