/*
  Warnings:

  - A unique constraint covering the columns `[worldId,name]` on the table `TaskTag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TaskTag_worldId_name_key" ON "public"."TaskTag"("worldId", "name");
