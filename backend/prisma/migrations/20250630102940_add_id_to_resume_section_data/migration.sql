/*
  Warnings:

  - The required column `id` was added to the `Course` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `CustomData` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Education` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `EmploymentHistory` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Language` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Link` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Skill` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CustomData" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "CustomData_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Education_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "EmploymentHistory" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "EmploymentHistory_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Language_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Link_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Skill_pkey" PRIMARY KEY ("id");
