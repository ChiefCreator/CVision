/*
  Warnings:

  - You are about to drop the column `is_ordered_fixed` on the `SectionTemplate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."SectionTemplate" DROP COLUMN "is_ordered_fixed",
ADD COLUMN     "is_order_fixed" BOOLEAN NOT NULL DEFAULT false;
