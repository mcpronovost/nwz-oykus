import { PrismaClient } from "@prisma/client";

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
