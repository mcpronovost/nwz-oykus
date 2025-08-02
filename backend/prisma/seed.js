import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/auth.js";
import { oykSlugify } from "../src/utils/formatters.js";

const prisma = new PrismaClient();

async function main() {
  // Create user
  const user = await prisma.user.upsert({
    where: { email: "mc@oykus.ca" },
    update: {password: await hashPassword("123"),},
    create: {
      id: "bf50764f-c2e1-427d-9e30-eb199942851b",
      email: "mc@oykus.ca",
      username: "mc",
      password: await hashPassword("123"),
      playerName: "mc",
      abbr: "MC",
    },
  });
  const kamuy = await prisma.user.upsert({
    where: { email: "kamuy@oykus.ca" },
    update: {password: await hashPassword("123"),},
    create: {
      id: "bf50764f-c2e1-427d-9e30-eb199942851c",
      email: "kamuy@oykus.ca",
      username: "kamuy",
      password: await hashPassword("123"),
      playerName: "Kamuy Sinen",
      abbr: "KS",
    },
  });

  // Create world
  const world = await prisma.world.upsert({
    where: { id: 1, name: "Qalatlán" },
    update: {
      ownerId: user.id,
    },
    create: {
      name: "Qalatlán",
      description: "Seeded world for mc",
      abbr: "Q",
      slug: oykSlugify("Qalatlán"),
      isActive: true,
      isPublic: false,
      ownerId: user.id,
    },
  });
  await prisma.world.upsert({
    where: { id: 2, name: "Hobeon" },
    update: {},
    create: {
      name: "Hobeon",
      description: "Hollow beings on.",
      abbr: "H",
      slug: oykSlugify("Hobeon"),
      isActive: true,
      isPublic: false,
      ownerId: user.id,
    },
  });

  // Create world theme
  await prisma.worldTheme.upsert({
    where: { id: 1 },
    update: {},
    create: {
      worldId: 1,
      name: "Qalatlán Default",
      isActive: true,
      primary: "#8d8305",
      primaryFg: "#ffffff",
    },
  });

  // Create task status
  await prisma.taskStatus.upsert({
    where: { id: 1 },
    update: {},
    create: {
      worldId: 1,
      name: "To Do",
      color: "#217097",
      sortOrder: 1,
    },
  });
  await prisma.taskStatus.upsert({
    where: { id: 2 },
    update: {},
    create: {
      worldId: 1,
      name: "In Progress",
      color: "#8d6335",
      sortOrder: 2,
    },
  });
  await prisma.taskStatus.upsert({
    where: { id: 3 },
    update: {},
    create: {
      worldId: 1,
      name: "In Review",
      color: "#6c3c95",
      sortOrder: 3,
    },
  });
  await prisma.taskStatus.upsert({
    where: { id: 4 },
    update: {},
    create: {
      worldId: 1,
      name: "Done",
      color: "#4a8d35",
      isCompleted: true,
      sortOrder: 4,
    },
  });

  // Create task tags
  const roleplayTag = await prisma.taskTag.upsert({
    where: { id: 1 },
    update: {},
    create: {
      worldId: 1,
      name: "Roleplay",
      color: null,
    },
  });

  // Delete all tasks
  await prisma.task.deleteMany({
    where: {
      worldId: 1,
    },
  });

  // Create task
  await prisma.task.upsert({
    where: { id: 1 },
    update: {},
    create: {
      worldId: 1,
      title: "Créer la gestion du lore",
      content: "Créer la gestion du lore",
      priority: "HIGH",
      statusId: 1,
      dueAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      authorId: user.id,
      assignees: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  await prisma.task.upsert({
    where: { id: 2 },
    update: {},
    create: {
      worldId: 1,
      title: "Créer le backend et le frontend pour la gestion des tâches",
      content: "Créer le backend et le frontend pour la gestion des tâches",
      priority: "MEDIUM",
      statusId: 2,
      authorId: user.id,
      assignees: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  await prisma.task.upsert({
    where: { id: 3 },
    update: {},
    create: {
      worldId: 1,
      title: "Gestion des commentaires",
      content:
        "Créer le frontend et le backend pour la gestion des commentaires",
      priority: "LOW",
      statusId: 1,
      authorId: user.id,
      assignees: {
        connect: {
          id: kamuy.id,
        },
      },
    },
  });
  await prisma.task.upsert({
    where: { id: 4 },
    update: {},
    create: {
      worldId: 1,
      title: "Gestion des tags",
      content: "Créer le frontend et le backend pour la gestion des tags",
      priority: "MEDIUM",
      statusId: 1,
      authorId: user.id,
      assignees: {
        connect: [
          {
            id: user.id,
          },
          {
            id: kamuy.id,
          },
        ],
      },
    },
  });
  await prisma.task.upsert({
    where: { id: 5 },
    update: {},
    create: {
      worldId: 1,
      title: "Commencer à écrire le lore",
      content: "Commencer à écrire le lore",
      dueAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      statusId: 1,
      authorId: user.id,
      assignees: {
        connect: {
          id: user.id,
        },
      },
      tags: {
        connect: {
          id: roleplayTag.id,
        },
      },
    },
  });
  await prisma.task.upsert({
    where: { id: 6 },
    update: {},
    create: {
      worldId: 1,
      title: "Créer la gestion des tâches",
      content:
        "Développer la gestion des tâches, en commençant par le backend, les schemas prisma et les routes, puis, le frontend.",
      dueAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      statusId: 4,
      priority: "MEDIUM",
      authorId: user.id,
      assignees: {
        connect: {
          id: user.id,
        },
      },
      tags: {
        connect: {
          id: roleplayTag.id,
        },
      },
    },
  });

  console.log({ user, world, roleplayTag });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
