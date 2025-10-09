import { registerAs } from '@nestjs/config';

export default registerAs("app", () => ({
  port: parseInt(process.env.PORT ?? "4200"),
  backendUrl: process.env.BACKEND_URL,
  env: process.env.NODE_ENV ?? "development",
  clientUrl: process.env.CLIENT_URL,
}));
