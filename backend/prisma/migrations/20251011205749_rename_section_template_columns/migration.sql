/*
  Warnings:

  - You are about to drop the column `defaultOrder` on the `SectionTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `isDefault` on the `SectionTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `isOrderFixed` on the `SectionTemplate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."SectionTemplate" DROP COLUMN "defaultOrder",
DROP COLUMN "isDefault",
DROP COLUMN "isOrderFixed",
ADD COLUMN     "default_order" INTEGER,
ADD COLUMN     "is_default" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_ordered_fixed" BOOLEAN NOT NULL DEFAULT false;
