import { registerAs } from '@nestjs/config';

export default registerAs("session", () => ({
  secret: process.env.SESSION_SECRET,
  name: process.env.SESSION_NAME ?? "sid",
  domain: process.env.SESSION_DOMAIN ?? "sid",
  maxAge: parseInt(process.env.SESSION_MAX_AGE ?? "86400000"),
  httpOnly: process.env.SESSION_HTTP_ONLY === "true",
  secure: process.env.SESSION_SECURE === "true",
  sameSite: (process.env.SESSION_SAME_SITE ?? "lax") as "lax" | "strict" | "none",
  folder: process.env.SESSION_FOLDER ?? "sessions:"
}));
