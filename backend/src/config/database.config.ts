import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "password",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  db: process.env.POSTGRES_DB || "testdb",
  uri: process.env.POSTGRES_URI,
}))