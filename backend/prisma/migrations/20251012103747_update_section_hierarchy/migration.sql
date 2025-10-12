/*
  Warnings:

  - You are about to drop the column `allowed_children` on the `SectionTemplate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[document_id,parent_id,order]` on the table `Section` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."SectionTemplate" DROP COLUMN "allowed_children";

-- CreateTable
CREATE TABLE "public"."SectionTemplateRelation" (
    "id" TEXT NOT NULL,
    "parent_id" TEXT NOT NULL,
    "child_id" TEXT NOT NULL,

    CONSTRAINT "SectionTemplateRelation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SectionTemplateRelation_parent_id_child_id_key" ON "public"."SectionTemplateRelation"("parent_id", "child_id");

-- CreateIndex
CREATE UNIQUE INDEX "Section_document_id_parent_id_order_key" ON "public"."Section"("document_id", "parent_id", "order");

-- AddForeignKey
ALTER TABLE "public"."SectionTemplateRelation" ADD CONSTRAINT "SectionTemplateRelation_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."SectionTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SectionTemplateRelation" ADD CONSTRAINT "SectionTemplateRelation_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "public"."SectionTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
