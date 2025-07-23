import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import prisma from "../prisma/client.js";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  // eslint-disable-next-line n/no-process-exit
  process.exit(0);
});