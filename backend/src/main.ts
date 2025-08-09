import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import * as cookieParser  from "cookie-parser";
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.setGlobalPrefix("api");
  app.enableCors({
    origin: config.getOrThrow<string>("app.clientUrl"),
    credentials: true,
  });
  app.use(cookieParser(config.getOrThrow<string>("cookie.secret")));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(config.getOrThrow<number>("app.port"));
}

bootstrap();
