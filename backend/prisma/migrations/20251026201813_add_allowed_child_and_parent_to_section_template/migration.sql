/*
  Warnings:

  - You are about to drop the `SectionTemplateRelation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[allowed_child_id]` on the table `SectionTemplate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[allowed_parent_id]` on the table `SectionTemplate` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."SectionTemplateRelation" DROP CONSTRAINT "SectionTemplateRelation_child_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."SectionTemplateRelation" DROP CONSTRAINT "SectionTemplateRelation_parent_id_fkey";

-- AlterTable
ALTER TABLE "public"."SectionTemplate" ADD COLUMN     "allowed_child_id" TEXT,
ADD COLUMN     "allowed_parent_id" TEXT;

-- DropTable
DROP TABLE "public"."SectionTemplateRelation";

-- CreateIndex
CREATE UNIQUE INDEX "SectionTemplate_allowed_child_id_key" ON "public"."SectionTemplate"("allowed_child_id");

-- CreateIndex
CREATE UNIQUE INDEX "SectionTemplate_allowed_parent_id_key" ON "public"."SectionTemplate"("allowed_parent_id");

-- AddForeignKey
ALTER TABLE "public"."SectionTemplate" ADD CONSTRAINT "SectionTemplate_allowed_child_id_fkey" FOREIGN KEY ("allowed_child_id") REFERENCES "public"."SectionTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SectionTemplate" ADD CONSTRAINT "SectionTemplate_allowed_parent_id_fkey" FOREIGN KEY ("allowed_parent_id") REFERENCES "public"."SectionTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
