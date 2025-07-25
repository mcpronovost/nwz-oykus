import express from "express";
import prisma from "../../prisma/client.js";

const router = express.Router();

// --- TASKS ---
// Get all tasks for a world (list view, ordered by createdAt desc)
router.get("/world/:worldId/tasks", async (req, res) => {
  const { worldId } = req.params;
  const tasks = await prisma.task.findMany({
    where: { worldId: Number(worldId) },
    include: {
      author: true,
      assignedTo: true,
      status: true,
      tags: true,
      comments: true,
      history: true,
    },
    orderBy: { createdAt: "desc" },
  });
  res.json(tasks);
});

// Get tasks for Kanban view (grouped by status, ordered by priority)
router.get("/world/:worldId/kanban", async (req, res) => {
  const { worldId } = req.params;
  const statuses = await prisma.taskStatus.findMany({
    where: { worldId: Number(worldId) },
    include: {
      tasks: {
        include: {
          author: true,
          assignedTo: true,
          tags: true,
          comments: true,
          history: true,
        },
        orderBy: { priority: "desc" },
      },
    },
    orderBy: { name: "asc" },
  });
  res.json(statuses);
});

// Create a new task
router.post("/tasks", async (req, res) => {
  const { title, content, worldId, authorId, assignedToIds, statusId, priority, tagIds } = req.body;
  const task = await prisma.task.create({
    data: {
      title,
      content,
      world: { connect: { id: Number(worldId) } },
      author: { connect: { id: authorId } },
      assignedTo: { connect: assignedToIds?.map(id => ({ id })) },
      status: { connect: { id: statusId } },
      priority,
      tags: { connect: tagIds?.map(id => ({ id })) },
    },
    include: {
      author: true,
      assignedTo: true,
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
  const { title, content, assignedToIds, statusId, priority, tagIds } = req.body;
  const task = await prisma.task.update({
    where: { id: taskId },
    data: {
      title,
      content,
      assignedTo: assignedToIds ? { set: assignedToIds.map(id => ({ id })) } : undefined,
      status: statusId ? { connect: { id: statusId } } : undefined,
      priority,
      tags: tagIds ? { set: tagIds.map(id => ({ id })) } : undefined,
    },
    include: {
      author: true,
      assignedTo: true,
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
  await prisma.task.delete({ where: { id: taskId } });
  res.status(204).end();
});

// --- STATUSES ---
// Get all statuses for a world
router.get("/world/:worldId/statuses", async (req, res) => {
  const { worldId } = req.params;
  const statuses = await prisma.taskStatus.findMany({
    where: { worldId: Number(worldId) },
    orderBy: { name: "asc" },
  });
  res.json(statuses);
});

// Create a new status
router.post("/statuses", async (req, res) => {
  const { name, worldId, createdBy } = req.body;
  const status = await prisma.taskStatus.create({
    data: {
      name,
      world: { connect: { id: Number(worldId) } },
      creator: { connect: { id: createdBy } },
    },
  });
  res.status(201).json(status);
});

// Update a status
router.put("/statuses/:statusId", async (req, res) => {
  const { statusId } = req.params;
  const { name } = req.body;
  const status = await prisma.taskStatus.update({
    where: { id: statusId },
    data: { name },
  });
  res.json(status);
});

// Delete a status
router.delete("/statuses/:statusId", async (req, res) => {
  const { statusId } = req.params;
  await prisma.taskStatus.delete({ where: { id: statusId } });
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
      creator: { connect: { id: createdBy } },
    },
  });
  res.status(201).json(tag);
});

// Update a tag
router.put("/tags/:tagId", async (req, res) => {
  const { tagId } = req.params;
  const { name } = req.body;
  const tag = await prisma.taskTag.update({
    where: { id: tagId },
    data: { name },
  });
  res.json(tag);
});

// Delete a tag
router.delete("/tags/:tagId", async (req, res) => {
  const { tagId } = req.params;
  await prisma.taskTag.delete({ where: { id: tagId } });
  res.status(204).end();
});

// --- COMMENTS ---
// Get all comments for a task
router.get("/tasks/:taskId/comments", async (req, res) => {
  const { taskId } = req.params;
  const comments = await prisma.taskComment.findMany({
    where: { taskId },
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
      task: { connect: { id: taskId } },
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
    where: { taskId },
    orderBy: { createdAt: "asc" },
  });
  res.json(history);
});

export default router; 