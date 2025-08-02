import prisma from "../../prisma/client.js";

/**
 * Middleware to validate world ID and check user permissions
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const permissionsWorldStaff = async (req, res, next) => {
  const { worldId } = req.params;

  // Check if worldId is a number and if not, return a 400 error
  if (isNaN(worldId)) {
    return res.status(400).json({ error: "World ID must be a number" });
  }

  // Check if world exists and current user is owner
  const world = await prisma.world.findUnique({
    where: { id: Number(worldId) },
    include: {
      owner: {
        select: {
          id: true,
        },
      },
      staff: {
        where: {
          userId: req.user.id,
        },
        select: {
          id: true,
          role: true,
        },
      },
    },
  });

  if (!world || (world.owner.id !== req.user.id && !world.staff.length)) {
    return res
      .status(403)
      .json({ error: "You don't have permission to see this world" });
  }

  // Attach the world to the request object for use in route handlers
  req.world = world;
  next();
};

/**
 * Middleware to validate world ID only (without permission check)
 * Useful for routes that need world validation but different permission logic
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const validateWorldId = async (req, res, next) => {
  const { worldId } = req.params;

  // Check if worldId is a number and if not, return a 400 error
  if (isNaN(worldId)) {
    return res.status(400).json({ error: "World ID must be a number" });
  }

  // Check if world exists
  const world = await prisma.world.findUnique({
    where: { id: Number(worldId) },
  });

  if (!world) {
    return res.status(404).json({ error: "World not found" });
  }

  // Attach the world to the request object for use in route handlers
  req.world = world;
  next();
}; 