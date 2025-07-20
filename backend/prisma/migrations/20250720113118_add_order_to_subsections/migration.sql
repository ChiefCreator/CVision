/*
  Warnings:

  - Added the required column `order` to the `CourseSubsection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `CustomSubsection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `EducationSubsection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `EmploymentHistorySubsection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `ExtraCurricularActivitySubsection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `InternshipSubsection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `LanguageSubsection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `LinkSubsection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `ReferenceSubsection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `SkillSubsection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseSubsection" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CustomSubsection" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "EducationSubsection" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "EmploymentHistorySubsection" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ExtraCurricularActivitySubsection" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "InternshipSubsection" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LanguageSubsection" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LinkSubsection" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ReferenceSubsection" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SkillSubsection" ADD COLUMN     "order" INTEGER NOT NULL;
