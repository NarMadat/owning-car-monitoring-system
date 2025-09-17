import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import type { ConfigType } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<ConfigType>);
  const port = configService.get('PORT');

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();