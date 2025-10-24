-- AlterTable
ALTER TABLE "public"."DocumentTemplate" ADD COLUMN     "settings" JSONB NOT NULL DEFAULT '{}';
