-- AlterTable
ALTER TABLE "SkillSubsection" ALTER COLUMN "level" DROP NOT NULL,
ALTER COLUMN "level" SET DEFAULT 'expert';
