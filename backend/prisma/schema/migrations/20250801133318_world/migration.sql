/*
  Warnings:

  - You are about to alter the column `abbr` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(4)` to `VarChar(3)`.
  - A unique constraint covering the columns `[name]` on the table `World` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `World` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `abbr` to the `World` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `World` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "abbr" SET DATA TYPE VARCHAR(3);

-- AlterTable
ALTER TABLE "public"."World" ADD COLUMN     "abbr" VARCHAR(3) NOT NULL,
ADD COLUMN     "slug" VARCHAR(120) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "World_name_key" ON "public"."World"("name");

-- CreateIndex
CREATE UNIQUE INDEX "World_slug_key" ON "public"."World"("slug");
