import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiHeader } from '@nestjs/swagger';
import { NoTransfInterceptor, NoToken } from './decorator/request.decort';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @NoToken()
  @NoTransfInterceptor()
  getHello() {
    return this.appService.getHello();
  }

  @NoToken()
  @Get('testRes')
  getTest(@Res() res): string {
    return res.status(200).send(['testRes']);
  }

  @ApiHeader({
    name: 'access-token',
    required: true,
    description: '本次请求请带上token',
    example: '546f9a99651c4d13b126f353048766b8',
  })
  @Get('getHelloByToken')
  getHelloByToken(): string {
    return this.appService.getHello();
  }

  @Get('/nologin/health')
  @NoToken()
  @NoTransfInterceptor()
  health(): object {
    return {
      status: 'UP',
    };
  }
}
