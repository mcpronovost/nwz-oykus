/*
  Warnings:

  - Added the required column `ownerId` to the `World` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."World" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."World" ADD CONSTRAINT "World_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
