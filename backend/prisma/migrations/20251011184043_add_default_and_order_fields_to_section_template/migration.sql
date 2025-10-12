-- AlterTable
ALTER TABLE "public"."SectionTemplate" ADD COLUMN     "defaultOrder" INTEGER,
ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isOrderFixed" BOOLEAN NOT NULL DEFAULT false;
