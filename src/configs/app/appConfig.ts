import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { swaggerBaseData } from '../swagger/swagger.doc';

export const appConfigure = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle(swaggerBaseData.title)
    .setDescription(swaggerBaseData.description)
    .setVersion('0.1')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());
};
