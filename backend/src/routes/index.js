import express from "express";
import tasksRouter from "./tasks.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to KP Kotan API!" });
});

router.use(tasksRouter);

export default router;