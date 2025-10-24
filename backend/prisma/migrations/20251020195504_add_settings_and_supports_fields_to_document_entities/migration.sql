-- AlterTable
ALTER TABLE "public"."Document" ADD COLUMN     "settings" JSONB;

-- AlterTable
ALTER TABLE "public"."DocumentTemplate" ADD COLUMN     "premium" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "supported_formats" TEXT[] DEFAULT ARRAY['pdf']::TEXT[],
ADD COLUMN     "supports_custom_accent_color" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "supports_font_sizing" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "supports_photo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "supports_spacing" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "settings" DROP NOT NULL,
ALTER COLUMN "settings" DROP DEFAULT;
