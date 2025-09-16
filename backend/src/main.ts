import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { NestFactory } from '@nestjs/core';
import * as cookieParser from "cookie-parser";
import { AppModule } from './app.module';

import { RedisStore } from 'connect-redis';
import * as session from 'express-session';
import { createClient } from 'redis';

import { toMs } from "ms-typescript";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const redisClient = createClient({ url: config.getOrThrow<string>("redis.uri")});
  redisClient.on("error", (err) => console.log("Redis Client Error", err));
  await redisClient.connect(); 

  app.setGlobalPrefix("api");
  app.enableCors({
    origin: config.getOrThrow<string>("app.clientUrl"),
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(cookieParser(config.getOrThrow<string>("cookie.secret")));
  app.use(session({
    secret: config.getOrThrow<string>("session.secret"),
    name: config.getOrThrow<string>("session.name"),
    resave: true, 
    saveUninitialized: false,
    cookie: {
      domain: config.getOrThrow<string>("session.domain"),
      maxAge: toMs(config.getOrThrow<string>("session.maxAge")),
      httpOnly: config.getOrThrow<boolean>("session.httpOnly"),
      secure: config.getOrThrow<boolean>("session.secure"),
      sameSite: config.getOrThrow<boolean>("session.sameSite"),
    },
    store: new RedisStore({
      client: redisClient,
      prefix: config.getOrThrow<string>("session.folder"),
    })
  }))

  await app.listen(config.getOrThrow<number>("app.port"));
}

bootstrap();
