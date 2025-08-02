import express from "express";
import prisma from "../../prisma/client.js";
import { authenticateToken } from "../middleware/auth.js";
import { permissionsWorldStaff } from "../middleware/world.js";

const router = express.Router({ mergeParams: true });

// --- TASKS ---
/**
 * Get all tasks for a world (grouped by status, ordered by priority)
 * @param {string} req.params.worldId - The world ID
 */
router.get("/", authenticateToken, permissionsWorldStaff, async (req, res) => {
  const { worldId } = req.params;
  // Get all tasks grouped by status
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
          { dueAt: "asc" },
        ],
      },
    },
    orderBy: { sortOrder: "asc" },
  });
  res.json(data);
});

/**
 * Create a new task
 * @param {string} req.params.worldId - The world ID
 *
 * @param {string} req.body.title - The task title
 * @param {string} req.body.content - The task content
 * @param {string} req.body.authorId - The task author ID
 * @param {string[]} req.body.assigneeIds - The task assignee IDs
 * @param {string} req.body.statusId - The task status ID
 */
router.post("/create", authenticateToken, permissionsWorldStaff, async (req, res) => {
  const { worldId } = req.params;
  const { title, content, authorId, assigneeIds, statusId, priority, tagIds } =
    req.body;
  const task = await prisma.task.create({
    data: {
      title,
      content,
      world: { connect: { id: Number(worldId) } },
      author: { connect: { id: authorId } },
      assignees: { connect: assigneeIds?.map((id) => ({ id })) },
      status: { connect: { id: Number(statusId) } },
      priority: priority || undefined,
      tags: { connect: tagIds?.map((id) => ({ id })) },
    },
    include: {
      author: true,
      assignees: true,
      status: true,
      tags: true,
    },
  });
  res.status(201).json({ id: task.id });
});

router.patch("/:taskId/edit", authenticateToken, permissionsWorldStaff, async (req, res) => {
  const { worldId, taskId } = req.params;
  const { title, content, priority, dueAt } = req.body;
  const currentUser = req.user;

  // First, get the current task to compare values
  const currentTask = await prisma.task.findUnique({
    where: { id: Number(taskId), worldId: Number(worldId) },
  });

  if (!currentTask) {
    return res.status(404).json({ error: "Task not found" });
  }

  // Prepare history entries for changed fields
  const historyEntries = [];
  const newDueAt = dueAt ? new Date(dueAt + "T00:00:00") : null;

  // Check if title changed
  if (title !== undefined && title !== currentTask.title) {
    historyEntries.push({
      changedById: currentUser.id,
      changeType: "TITLE",
      oldValue: currentTask.title,
      newValue: title,
    });
  }

  // Check if content changed
  if (content !== undefined && content !== currentTask.content) {
    historyEntries.push({
      changedById: currentUser.id,
      changeType: "CONTENT",
      oldValue: currentTask.content,
      newValue: content,
    });
  }

  // Check if priority changed
  if (priority !== undefined && priority !== currentTask.priority) {
    historyEntries.push({
      changedById: currentUser.id,
      changeType: "PRIORITY",
      oldValue: currentTask.priority,
      newValue: priority,
    });
  }

  // Check if dueAt changed
  if (dueAt !== undefined && newDueAt?.getTime() !== currentTask.dueAt?.getTime()) {
    historyEntries.push({
      changedById: currentUser.id,
      changeType: "DUE_AT",
      oldValue: currentTask.dueAt ? currentTask.dueAt.toISOString().split("T")[0] : null,
      newValue: dueAt,
    });
  }

  // Update the task with new values and create history entries
  const task = await prisma.task.update({
    where: { id: Number(taskId), worldId: Number(worldId) },
    data: {
      title: title !== undefined ? title : currentTask.title,
      content: content !== undefined ? content : currentTask.content,
      priority: priority !== undefined ? priority : currentTask.priority,
      dueAt: newDueAt,
      ...(historyEntries.length > 0 && {
        history: {
          create: historyEntries,
        },
      }),
    },
  });
  res.json({ id: task.id });
});

/**
 * Update the status of a task
 * @param {string} req.params.worldId - The world ID
 * @param {string} req.params.taskId - The task ID
 *
 * @param {string} req.body.statusId - The task status ID
 */
router.patch("/:taskId/status", authenticateToken, permissionsWorldStaff, async (req, res) => {
  const { worldId, taskId } = req.params;
  const { statusId, oldStatusName, newStatusName } = req.body;
  const currentUser = req.user;

  const task = await prisma.task.update({
    where: { id: Number(taskId), worldId: Number(worldId) },
    data: {
      statusId,
      history: {
        create: {
          changedById: currentUser.id,
          changeType: "STATUS",
          oldValue: oldStatusName,
          newValue: newStatusName,
        },
      },
    },
  });
  res.json({ id: task.id });
});

/**
 * Delete a task
 * @param {string} req.params.worldId - The world ID
 * @param {string} req.params.taskId - The task ID
 */
router.delete("/:taskId/delete", authenticateToken, permissionsWorldStaff, async (req, res) => {
  const { worldId, taskId } = req.params;
  await prisma.task.delete({
    where: { id: Number(taskId), worldId: Number(worldId) },
  });
  res.status(204).json({ ok: true });
});

/**
 * Create a new status
 * @param {string} req.params.worldId - The world ID
 */
router.post("/status/create", authenticateToken, permissionsWorldStaff, async (req, res) => {
  const { worldId } = req.params;
  const { name, color, sortOrder } = req.body;
  const status = await prisma.taskStatus.create({
    data: {
      name,
      color,
      sortOrder: Number(sortOrder) || null,
      world: { connect: { id: Number(worldId) } },
    },
  });
  res.status(201).json(status);
});

/**
 * Update a task status
 * @param {string} req.params.worldId - The world ID
 * @param {string} req.params.statusId - The task status ID
 *
 * @param {string} req.body.name - The task status name
 * @param {string} req.body.color - The task status color
 * @param {number} req.body.sortOrder - The task status sort order
 */
router.patch("/status/:statusId/edit", authenticateToken, permissionsWorldStaff, async (req, res) => {
  const { worldId, statusId } = req.params;
  const { name, color, sortOrder } = req.body;
  // Update the status
  const status = await prisma.taskStatus.update({
    where: { id: Number(statusId), worldId: Number(worldId) },
    data: { name, color, sortOrder },
  });
  res.json({ id: status.id });
});

// --- STATUSES ---
// Get all statuses for a world
router.get("/statuses", async (req, res) => {
  const { worldId } = req.params;
  const statuses = await prisma.taskStatus.findMany({
    where: { worldId: Number(worldId) },
    orderBy: { sortOrder: "asc" },
  });
  res.json(statuses);
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
