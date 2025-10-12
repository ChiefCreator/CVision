/*
  Warnings:

  - Made the column `template_id` on table `Section` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Section" ALTER COLUMN "template_id" SET NOT NULL;
