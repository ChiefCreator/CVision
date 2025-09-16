-- CreateEnum
CREATE TYPE "ResumeTemplate" AS ENUM ('classic', 'modern', 'creative', 'professional');

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "template" "ResumeTemplate" NOT NULL DEFAULT 'classic';
