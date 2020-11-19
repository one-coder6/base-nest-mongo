import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function Completed(app) {
  // 生成接口文档
  const createSwagger = app => {
    const options = new DocumentBuilder()
      .setTitle('nest-monogo service nest doc')
      .setDescription('Api description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  };
  global.isDev && createSwagger(app);
}

export { Completed };
