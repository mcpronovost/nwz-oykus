import express from "express";
import prisma from "../../prisma/client.js";

const router = express.Router();

// --- USERS ---
// Get all users (for assignee selection)
router.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      playerName: true,
    },
    where: { isActive: true },
    orderBy: { username: "asc" },
  });
  res.json(users);
});

// --- TASKS ---
// Get all tasks for a world (grouped by status, ordered by priority)
router.get("/world/:worldId/tasks", async (req, res) => {
  const { worldId } = req.params;
  const data = await prisma.taskStatus.findMany({
    where: { worldId: Number(worldId) },
    include: {
      tasks: {
        include: {
          author: {
            select: {
              id: true,
              playerName: true,
              abbr: true,
            },
          },
          assignees: {
            select: {
              id: true,
              playerName: true,
              abbr: true,
            },
            orderBy: { playerName: "asc" },
          },
          tags: true,
          comments: true,
          history: true,
        },
        orderBy: [
          { priority: { sort: "desc", nulls: "last" } },
          { dueAt: "asc" }
        ],
      },
    },
    orderBy: { sortOrder: "asc" },
  });
  res.json(data);
});

// Update a task status
router.patch("/world/:worldId/tasks/:taskId/status", async (req, res) => {
  const { worldId, taskId } = req.params;
  const { statusId } = req.body;
  const task = await prisma.task.update({
    where: { id: Number(taskId), worldId: Number(worldId) },
    data: { statusId },
  });
  res.json(task);
});

// Update a status
router.patch("/world/:worldId/tasks/status/:statusId", async (req, res) => {
  console.log(req.body);
  const { worldId, statusId } = req.params;
  const { name, color, sortOrder } = req.body;
  const status = await prisma.taskStatus.update({
    where: { id: Number(statusId), worldId: Number(worldId) },
    data: { name, color, sortOrder },
  });
  res.json(status);
});






// Create a new task
router.post("/tasks", async (req, res) => {
  const { title, content, worldId, authorId, assigneeIds, statusId, priority, tagIds } = req.body;
  const task = await prisma.task.create({
    data: {
      title,
      content,
      world: { connect: { id: Number(worldId) } },
      author: { connect: { id: authorId } },
      assignees: { connect: assigneeIds?.map(id => ({ id })) },
      status: { connect: { id: statusId } },
      priority,
      tags: { connect: tagIds?.map(id => ({ id })) },
    },
    include: {
      author: true,
      assignees: true,
      status: true,
      tags: true,
      comments: true,
      history: true,
    },
  });
  res.status(201).json(task);
});

// Update a task
router.put("/tasks/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const { title, content, assigneeIds, statusId, priority, tagIds } = req.body;
  const task = await prisma.task.update({
    where: { id: Number(taskId) },
    data: {
      title,
      content,
      assignees: assigneeIds ? { set: assigneeIds.map(id => ({ id })) } : undefined,
      status: statusId ? { connect: { id: statusId } } : undefined,
      priority,
      tags: tagIds ? { set: tagIds.map(id => ({ id })) } : undefined,
    },
    include: {
      author: true,
      assignees: true,
      status: true,
      tags: true,
      comments: true,
      history: true,
    },
  });
  res.json(task);
});

// Delete a task
router.delete("/tasks/:taskId", async (req, res) => {
  const { taskId } = req.params;
  await prisma.task.delete({ where: { id: Number(taskId) } });
  res.status(204).end();
});

// --- STATUSES ---
// Get all statuses for a world
router.get("/world/:worldId/statuses", async (req, res) => {
  const { worldId } = req.params;
  const statuses = await prisma.taskStatus.findMany({
    where: { worldId: Number(worldId) },
    orderBy: { sortOrder: "asc" },
  });
  res.json(statuses);
});

// Create a new status
router.post("/statuses", async (req, res) => {
  const { name, worldId, sortOrder } = req.body;
  const status = await prisma.taskStatus.create({
    data: {
      name,
      sortOrder,
      world: { connect: { id: Number(worldId) } },
    },
  });
  res.status(201).json(status);
});

// Delete a status
router.delete("/statuses/:statusId", async (req, res) => {
  const { statusId } = req.params;
  await prisma.taskStatus.delete({ where: { id: Number(statusId) } });
  res.status(204).end();
});

// --- TAGS ---
// Get all tags for a world
router.get("/world/:worldId/tags", async (req, res) => {
  const { worldId } = req.params;
  const tags = await prisma.taskTag.findMany({
    where: { worldId: Number(worldId) },
    orderBy: { name: "asc" },
  });
  res.json(tags);
});

// Create a new tag
router.post("/tags", async (req, res) => {
  const { name, worldId, createdBy } = req.body;
  const tag = await prisma.taskTag.create({
    data: {
      name,
      world: { connect: { id: Number(worldId) } },
      // creator: { connect: { id: createdBy } },
    },
  });
  res.status(201).json(tag);
});

// Update a tag
router.put("/tags/:tagId", async (req, res) => {
  const { tagId } = req.params;
  const { name } = req.body;
  const tag = await prisma.taskTag.update({
    where: { id: Number(tagId) },
    data: { name },
  });
  res.json(tag);
});

// Delete a tag
router.delete("/tags/:tagId", async (req, res) => {
  const { tagId } = req.params;
  await prisma.taskTag.delete({ where: { id: Number(tagId) } });
  res.status(204).end();
});

// --- COMMENTS ---
// Get all comments for a task
router.get("/tasks/:taskId/comments", async (req, res) => {
  const { taskId } = req.params;
  const comments = await prisma.taskComment.findMany({
    where: { taskId: Number(taskId) },
    orderBy: { createdAt: "asc" },
  });
  res.json(comments);
});

// Add a comment to a task
router.post("/tasks/:taskId/comments", async (req, res) => {
  const { taskId } = req.params;
  const { authorId, content } = req.body;
  const comment = await prisma.taskComment.create({
    data: {
      task: { connect: { id: Number(taskId) } },
      author: { connect: { id: authorId } },
      content,
    },
  });
  res.status(201).json(comment);
});

// --- HISTORY ---
// Get all history for a task
router.get("/tasks/:taskId/history", async (req, res) => {
  const { taskId } = req.params;
  const history = await prisma.taskHistory.findMany({
    where: { taskId: Number(taskId) },
    orderBy: { createdAt: "asc" },
  });
  res.json(history);
});

export default router; 