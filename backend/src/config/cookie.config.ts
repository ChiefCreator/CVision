import { registerAs } from '@nestjs/config';

export default registerAs("cookie", () => ({
  secret: process.env.COOKIE_SECRET,
  maxAge: parseInt(process.env.COOKIE_MAX_AGE ?? "86400000"),
  secure: process.env.COOKIE_SECURE === "true",
}));
