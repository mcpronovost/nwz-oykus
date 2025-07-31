import express from "express";
import tasksRouter from "./tasks.js";
import authRouter from "./auth.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to Oykus API!" });
});

router.use("/auth", authRouter);
router.use("/world/:worldId/tasks", tasksRouter);

export default router;