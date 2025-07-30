import { PrismaClient, TaskPriority } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create user
  const user = await prisma.user.upsert({
    where: { email: "mc@oykus.ca" },
    update: {},
    create: {
      id: "bf50764f-c2e1-427d-9e30-eb199942851b",
      email: "mc@oykus.ca",
      username: "mc",
      password: "123",
      playerName: "mc",
      abbr: "MC",
    },
  });

  // Create world
  const world = await prisma.world.upsert({
    where: { id: 1, name: "Qalatlán" },
    update: {},
    create: {
      name: "Qalatlán",
      description: "Seeded world for mc",
      isActive: true,
      isPublic: false,
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
      sortOrder: 4,
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

  console.log({ user, world });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
