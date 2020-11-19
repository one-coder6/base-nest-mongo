import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NoToken } from 'src/decorator/request.decort';

@ApiTags('测试模块')
@Controller('test')
export class TestController {
  @Get()
  @NoToken()
  getHello() {
    return 'hello test';
  }
}
