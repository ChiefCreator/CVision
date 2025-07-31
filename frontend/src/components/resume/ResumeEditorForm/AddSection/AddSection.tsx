import React from "react";
import { useGeneralSectionsQuery, useResumeAutoUpdate } from "@/api/resume/hooks";
import { useAddSection } from "@/api/resumeSection/hooks";

import { Award, Briefcase, Languages, LucideProps } from "lucide-react";
import AddSectionItem from "./AddSectionItem/AddSectionItem";
import AddSectionSkeleton from "./AddSectionSkeleton";

import { SECTION_ADDITIONAL_NAMES } from "@/constants/resumeSection/sectionNames";

import { v4 } from "uuid";

import type { Resume } from "@/types/resume/resume";
import type { ResumeSectionName, ResumeAdditionalSectionName } from "@/types/resumeSection/sectionName";

import styles from "./AddSection.module.scss";
import { useResume } from "@/hooks/resume/useResume";

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
  const { addSectionAsync, changeIsAllUpdating } = useResume();

  const addSection = async (sectionName: ResumeSectionName, dto: any) => {
    const sectionId = v4();

    changeIsAllUpdating(true);
    toggleSection(sectionId);
    await addSectionAsync({ sectionName, sectionId, dto });

    changeIsAllUpdating(false);
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