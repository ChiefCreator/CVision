/*
  Warnings:

  - Made the column `template_id` on table `Document` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Document" DROP CONSTRAINT "Document_template_id_fkey";

-- AlterTable
ALTER TABLE "public"."Document" ALTER COLUMN "template_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "public"."DocumentTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
