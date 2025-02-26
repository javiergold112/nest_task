import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { appConfigure } from './configs/app/appConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  appConfigure(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
