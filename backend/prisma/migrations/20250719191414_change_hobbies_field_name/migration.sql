/*
  Warnings:

  - You are about to drop the column `description` on the `Hobbies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hobbies" DROP COLUMN "description",
ADD COLUMN     "hobbyDescription" TEXT;
