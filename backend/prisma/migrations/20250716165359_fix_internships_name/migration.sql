/*
  Warnings:

  - You are about to drop the `IntershipSubsection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Interships` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IntershipSubsection" DROP CONSTRAINT "IntershipSubsection_section_id_fkey";

-- DropForeignKey
ALTER TABLE "Interships" DROP CONSTRAINT "Interships_resume_id_fkey";

-- DropTable
DROP TABLE "IntershipSubsection";

-- DropTable
DROP TABLE "Interships";

-- CreateTable
CREATE TABLE "Internships" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "defaultTitle" TEXT,
    "order" INTEGER NOT NULL,
    "resume_id" TEXT NOT NULL,

    CONSTRAINT "Internships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternshipSubsection" (
    "id" TEXT NOT NULL,
    "job_title" TEXT,
    "employer" TEXT,
    "start_date" TEXT,
    "end_date" TEXT,
    "city" TEXT,
    "description" TEXT,
    "section_id" TEXT NOT NULL,

    CONSTRAINT "InternshipSubsection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Internships_resume_id_key" ON "Internships"("resume_id");

-- AddForeignKey
ALTER TABLE "Internships" ADD CONSTRAINT "Internships_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternshipSubsection" ADD CONSTRAINT "InternshipSubsection_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Internships"("id") ON DELETE CASCADE ON UPDATE CASCADE;
