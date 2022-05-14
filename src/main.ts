import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { setupSwagger } from 'src/util/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(4000);
}
bootstrap();
