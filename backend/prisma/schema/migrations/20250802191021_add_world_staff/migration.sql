-- CreateEnum
CREATE TYPE "public"."WorldStaffRole" AS ENUM ('ADMINISTRATOR', 'MODERATOR');

-- AlterTable
ALTER TABLE "public"."WorldTheme" ALTER COLUMN "cardItemFg" SET DEFAULT '#aeafb7',
ALTER COLUMN "popperFg" SET DEFAULT '#aeafb7';

-- CreateTable
CREATE TABLE "public"."WorldStaff" (
    "id" SERIAL NOT NULL,
    "worldId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "public"."WorldStaffRole" NOT NULL DEFAULT 'MODERATOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorldStaff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorldStaff_worldId_userId_key" ON "public"."WorldStaff"("worldId", "userId");

-- AddForeignKey
ALTER TABLE "public"."WorldStaff" ADD CONSTRAINT "WorldStaff_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "public"."World"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WorldStaff" ADD CONSTRAINT "WorldStaff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
