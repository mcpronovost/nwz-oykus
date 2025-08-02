import express from "express";
import prisma from "../../prisma/client.js";
import logger from "../utils/logger.js";
import {
  hashPassword,
  comparePassword,
  generateToken,
  validateEmail,
  validatePassword,
  validateUsername,
  validatePlayerName,
  validateAbbr,
} from "../utils/auth.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

const USER_INCLUDES = {
  worldsOwned: {
    where: {
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      abbr: true,
      slug: true,
      themes: {
        where: {
          isActive: true,
        },
      },
    },
  },
}

const USER_SELECT = {
  select: {
    id: true,
    playerName: true,
    abbr: true,
    ...USER_INCLUDES,
  },
}

// Register new user
router.post("/register", async (req, res) => {
  try {
    const { email, username, password, playerName, abbr } = req.body;

    // Validation
    if (!email || !username || !password || !playerName || !abbr) {
      return res.status(400).json({
        error:
          "All fields are required: email, username, password, playerName, abbr",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number",
      });
    }

    if (!validateUsername(username)) {
      return res.status(400).json({
        error:
          "Username must be 3-20 characters, alphanumeric and underscores only",
      });
    }

    if (!validatePlayerName(playerName)) {
      return res.status(400).json({
        error:
          "Player name must be 2-50 characters, letters, numbers, spaces, hyphens, apostrophes only",
      });
    }

    if (!validateAbbr(abbr)) {
      return res.status(400).json({
        error: "Abbreviation must be 2-4 alphanumeric characters",
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }, { playerName }, { abbr }],
      },
    });

    if (existingUser) {
      const conflicts = [];
      if (existingUser.email === email) conflicts.push("email");
      if (existingUser.username === username) conflicts.push("username");
      if (existingUser.playerName === playerName) conflicts.push("playerName");
      if (existingUser.abbr === abbr) conflicts.push("abbr");

      return res.status(409).json({
        error: `User already exists with: ${conflicts.join(", ")}`,
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        playerName,
        abbr,
      },
      select: {
        id: true,
        email: true,
        username: true,
        playerName: true,
        abbr: true,
        isActive: true,
        isAdmin: true,
        limitWorlds: true,
        totalWorlds: true,
        limitWorldThemes: true,
        totalWorldThemes: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Generate token
    const token = generateToken(user.id);

    logger.info(`New user registered: ${user.username} (${user.email})`);

    res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    logger.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
      include: USER_INCLUDES,
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(401).json({ error: "Account is deactivated" });
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user.id);

    // Return user data (excluding password)
    const userData = {
      id: user.id,
      playerName: user.playerName,
      abbr: user.abbr,
      worldsOwned: user.worldsOwned,
    };

    logger.info(`User logged in: ${user.playerName}`);

    res.json({
      message: "Login successful",
      user: userData,
      token,
    });
  } catch (error) {
    logger.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get current user profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id, isActive: true },
      ...USER_SELECT,
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (user.totalWorlds !== user.worldsOwned.length) {
      await prisma.user.update({
        where: { id: user.id },
        data: { totalWorlds: user.worldsOwned.length },
      });
      user.totalWorlds = user.worldsOwned.length;
    }

    res.json({
      user: user,
    });
  } catch (error) {
    logger.error("Profile fetch error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update user profile
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const { username, playerName, abbr } = req.body;
    const userId = req.user.id;

    // Validation
    if (username && !validateUsername(username)) {
      return res.status(400).json({
        error:
          "Username must be 3-20 characters, alphanumeric and underscores only",
      });
    }

    if (playerName && !validatePlayerName(playerName)) {
      return res.status(400).json({
        error:
          "Player name must be 2-50 characters, letters, numbers, spaces, hyphens, apostrophes only",
      });
    }

    if (abbr && !validateAbbr(abbr)) {
      return res.status(400).json({
        error: "Abbreviation must be 2-4 alphanumeric characters",
      });
    }

    // Check for conflicts if updating unique fields
    if (username || playerName || abbr) {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            ...(username ? [{ username }] : []),
            ...(playerName ? [{ playerName }] : []),
          ],
          NOT: { id: userId },
        },
      });

      if (existingUser) {
        const conflicts = [];
        if (existingUser.username === username) conflicts.push("username");
        if (existingUser.playerName === playerName)
          conflicts.push("playerName");

        return res.status(409).json({
          error: `User already exists with: ${conflicts.join(", ")}`,
        });
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(username && { username }),
        ...(playerName && { playerName }),
        ...(abbr && { abbr }),
      },
      select: {
        id: true,
        playerName: true,
        abbr: true,
        isActive: true,
        isAdmin: true,
        limitWorlds: true,
        totalWorlds: true,
        limitWorldThemes: true,
        totalWorldThemes: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    logger.info(`User profile updated: ${updatedUser.playerName}`);

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    logger.error("Profile update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Change password
router.put("/change-password", authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Current password and new password are required" });
    }

    if (!validatePassword(newPassword)) {
      return res.status(400).json({
        error:
          "New password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number",
      });
    }

    // Get current user with password
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Verify current password
    const isValidPassword = await comparePassword(
      currentPassword,
      user.password
    );
    if (!isValidPassword) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    logger.info(`Password changed for user: ${user.username}`);

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    logger.error("Password change error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Logout (client-side token removal, but we can log it)
router.post("/logout", authenticateToken, async (req, res) => {
  try {
    logger.info(`User logged out: ${req.user.username}`);
    res.json({ message: "Logout successful" });
  } catch (error) {
    logger.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
