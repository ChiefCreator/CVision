import { registerAs } from '@nestjs/config';

export default registerAs("redis", () => ({
  user: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST ?? "localhost",
  port: parseInt(process.env.REDIS_PORT ?? "6379"),
  uri: process.env.REDIS_URI,
}));
