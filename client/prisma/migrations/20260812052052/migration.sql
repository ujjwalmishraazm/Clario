/*
  Warnings:

  - The values [UPLOADED] on the enum `VideoStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `mimeType` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `originalName` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `storageKey` on the `Video` table. All the data in the column will be lost.
  - Added the required column `youtubeUrl` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VideoStatus_new" AS ENUM ('PENDING', 'PROCESSING', 'READY', 'FAILED');
ALTER TABLE "public"."Video" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Video" ALTER COLUMN "status" TYPE "VideoStatus_new" USING ("status"::text::"VideoStatus_new");
ALTER TYPE "VideoStatus" RENAME TO "VideoStatus_old";
ALTER TYPE "VideoStatus_new" RENAME TO "VideoStatus";
DROP TYPE "public"."VideoStatus_old";
ALTER TABLE "Video" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "mimeType",
DROP COLUMN "originalName",
DROP COLUMN "size",
DROP COLUMN "storageKey",
ADD COLUMN     "youtubeUrl" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "Analysis" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "actionItems" JSONB NOT NULL,
    "keyDecisions" JSONB NOT NULL,
    "openQuestions" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Analysis_videoId_key" ON "Analysis"("videoId");

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
