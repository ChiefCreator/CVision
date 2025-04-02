import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import logger from "./logs/log.js";

import authRouter from "./src/modules/auth/auth.router.js";
import { errorHandler } from "./src/middleware/ErrorHandler.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

app.use(errorHandler); 

const PORT = +process.env.PORT || 5001;
app.listen(PORT, () => logger.info(`Сервер запущен на порту ${PORT}`));
