-- AlterTable
ALTER TABLE "public"."Task" ADD COLUMN     "dueAt" TIMESTAMP(3),
ALTER COLUMN "priority" DROP NOT NULL;
