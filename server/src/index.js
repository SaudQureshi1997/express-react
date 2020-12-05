import express from "express";
import logger from "@utils/logger.js";
import HttpException from "@exceptions/HttpException.js";
import router from "@http/routes.js";
import connection from "@utils/connection.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
  const code = err instanceof HttpException ? err.code : 500;
  logger.error({
    message: err.message,
    code,
    trace: err.stack,
  });
  return res.status(code).json({ error: err.message });
});

app.use(router);

app.listen(process.env.APP_PORT || 8000, async () => {
  await connection();
  console.log("Connected to mongoose");
  console.log(`Started at: ${process.env.APP_PORT || 8000}...`);
});
