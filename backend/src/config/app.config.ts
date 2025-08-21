import { registerAs } from '@nestjs/config';

export default registerAs("app", () => ({
  port: parseInt(process.env.PORT ?? "4200"),
  env: process.env.NODE_ENV ?? "development",
  clientUrl: process.env.CLIENT_URL,
  testUserId: process.env.TEST_USER_ID,
}));
