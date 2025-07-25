import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create user
  const user = await prisma.user.upsert({
    where: { email: "mc@nwz.ca" },
    update: {},
    create: {
      email: "mc@nwz.ca",
      username: "mc",
      password: "123",
      playerName: "mc",
      abbr: "MC",
    },
  });

  // Create world
  const world = await prisma.world.upsert({
    where: { name: "Qalatlán" },
    update: {},
    create: {
      name: "Qalatlán",
      description: "Seeded world for mc",
      isActive: true,
      isPublic: false,
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