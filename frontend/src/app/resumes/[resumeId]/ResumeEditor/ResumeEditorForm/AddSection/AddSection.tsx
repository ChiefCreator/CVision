import React from "react";
import { useGeneralSectionsQuery } from "@/api/resume/hooks";
import { useAddSection } from "@/api/resumeSection/hooks";

import { Award, Briefcase, Languages, LucideProps } from "lucide-react";
import AddSectionItem from "./AddSectionItem/AddSectionItem";
import AddSectionSkeleton from "./AddSectionSkeleton";

import { SECTION_ADDITIONAL_NAMES } from "@/constants/sectionNames";

import { v4 } from "uuid";

import type { Resume } from "@/types/resumeTypes/resume";
import type { ResumeSectionName, ResumeAdditionalSectionName } from "@/types/sectionTypes/sectionName";

import styles from "./AddSection.module.scss";

interface AddSectionProps {
  resume: Resume;
  toggleSection: (sectionId: string, subsectionId?: string, open?: boolean) => void;
}

type SectionIconsMap = {
  [key in ResumeAdditionalSectionName]: React.ComponentType<LucideProps & React.RefAttributes<SVGSVGElement>>;
}

const sectionIconsMap: SectionIconsMap = {
  languages: Languages,
  courses: Award,
  internships: Briefcase,
  hobbies: Languages,
  extraCurricularActivities: Award,
  references: Briefcase,
  customSections: Briefcase
}

export default function AddSection({ resume, toggleSection }: AddSectionProps) {
  const { data: generalSections, isLoading } = useGeneralSectionsQuery();
  const { mutate } = useAddSection(resume.id);

  const addSection = (sectionName: ResumeSectionName, dto: any) => {
    const sectionId = v4();

    mutate({ sectionName, sectionId, dto });
    toggleSection(sectionId);
  }

  if (isLoading) return <AddSectionSkeleton />;
  if (!generalSections) return "error";

  return (
    <section className={styles.section}>
      <header className={styles.head}>
        <h2 className={styles.title}>Добавить секцию</h2>
      </header>

      <ul className={styles.list}>
        {SECTION_ADDITIONAL_NAMES.map(sectionName => {
          const generalSection = generalSections.find(section => section.type === sectionName);
          const { defaultTitle, description } = generalSection || {};

          return (
            <li key={sectionName}>
              <AddSectionItem
                title={defaultTitle}
                Icon={sectionIconsMap[sectionName]}
                isDisabled={sectionName === "customSections" ? false : !!resume?.[sectionName]}
                onClick={() => addSection(sectionName, { defaultTitle, description })}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}