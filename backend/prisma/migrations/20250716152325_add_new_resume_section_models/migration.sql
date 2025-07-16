-- CreateTable
CREATE TABLE "Interships" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "defaultTitle" TEXT,
    "order" INTEGER NOT NULL,
    "resume_id" TEXT NOT NULL,

    CONSTRAINT "Interships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntershipSubsection" (
    "id" TEXT NOT NULL,
    "job_title" TEXT,
    "employer" TEXT,
    "start_date" TEXT,
    "end_date" TEXT,
    "city" TEXT,
    "description" TEXT,
    "section_id" TEXT NOT NULL,

    CONSTRAINT "IntershipSubsection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hobbies" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "defaultTitle" TEXT,
    "order" INTEGER NOT NULL,
    "description" TEXT,
    "resume_id" TEXT NOT NULL,

    CONSTRAINT "Hobbies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExtraCurricularActivities" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "defaultTitle" TEXT,
    "order" INTEGER NOT NULL,
    "resume_id" TEXT NOT NULL,

    CONSTRAINT "ExtraCurricularActivities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExtraCurricularActivitySubsection" (
    "id" TEXT NOT NULL,
    "function_title" TEXT,
    "employer" TEXT,
    "start_date" TEXT,
    "end_date" TEXT,
    "city" TEXT,
    "description" TEXT,
    "section_id" TEXT NOT NULL,

    CONSTRAINT "ExtraCurricularActivitySubsection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "References" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "defaultTitle" TEXT,
    "order" INTEGER NOT NULL,
    "resume_id" TEXT NOT NULL,

    CONSTRAINT "References_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferenceSubsection" (
    "id" TEXT NOT NULL,
    "referent_full_name" TEXT,
    "company" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "section_id" TEXT NOT NULL,

    CONSTRAINT "ReferenceSubsection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Interships_resume_id_key" ON "Interships"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "Hobbies_resume_id_key" ON "Hobbies"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "ExtraCurricularActivities_resume_id_key" ON "ExtraCurricularActivities"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "References_resume_id_key" ON "References"("resume_id");

-- AddForeignKey
ALTER TABLE "Interships" ADD CONSTRAINT "Interships_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntershipSubsection" ADD CONSTRAINT "IntershipSubsection_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Interships"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hobbies" ADD CONSTRAINT "Hobbies_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraCurricularActivities" ADD CONSTRAINT "ExtraCurricularActivities_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraCurricularActivitySubsection" ADD CONSTRAINT "ExtraCurricularActivitySubsection_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "ExtraCurricularActivities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "References" ADD CONSTRAINT "References_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferenceSubsection" ADD CONSTRAINT "ReferenceSubsection_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "References"("id") ON DELETE CASCADE ON UPDATE CASCADE;
