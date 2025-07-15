import { useCallback, useEffect, useState } from "react";

import ResumeEditorFormSkeleton from "@/app/resumes/[resumeId]/ResumeEditor/ResumeEditorForm/ResumeEditorFormSkeleton";
import Head from "./Head/Head";
import PersonalDetails from "./sections/PersonalDetails/PersonalDetails";
import ProfessionalSummary from "./sections/ProfessionalSummary/ProfessionalSummary";
import EmploymentHistory from "./sections/EmploymentHistory/EmploymentHistory";

import { ChangeResumeField, isSectionDefault, Resume } from "@/types/resumeTypes";
import { ResumeSectionName } from "@/types/resumeTypes";
import { BaseComponent } from "@/types/rootTypes";

import styles from "./ResumeEditorForm.module.scss";
import clsx from "clsx";
import Education from "./sections/Education/Education";

const sectionNames: ResumeSectionName[] = ["personalDetails", "professionalSummary", "employmentHistory", "education", "links", "skills", "languages", "courses", "customSections"]

interface ResumeEditorForm extends BaseComponent {
  resume?: Resume;
  changeField: ChangeResumeField;
  isGetResumeLoading: boolean;
}

type SectionsOpenState = {
  [sectionId: string]: {
    isOpen: boolean;
    openSubsections?: string[];
  };
};

export default function ResumeEditorForm({ className, resume, changeField, isGetResumeLoading }: ResumeEditorForm) {
  const [sectionsOpenState, setSectionsOpenState] = useState<SectionsOpenState | "auto">("auto");

  const toggleSection = useCallback((sectionId: string, subsectionId?: string, open?: boolean) => {
    setSectionsOpenState(prev => {
      if (prev === "auto") prev = {};

      const sectionState = prev[sectionId];
      const isOpen = !subsectionId ? !sectionState?.isOpen : sectionState?.isOpen;

      let openSubsections: string[] = [];

      if (isOpen) {
        openSubsections = sectionState?.openSubsections ?? [];

        if (subsectionId) {
          if (open !== undefined) {
            openSubsections = open ? [...openSubsections, subsectionId] : openSubsections.filter(id => id !== subsectionId);
          } else {
            if (openSubsections.includes(subsectionId)) {
              openSubsections = openSubsections.filter(id => id !== subsectionId);
            } else {
              openSubsections = [...openSubsections, subsectionId];
            }
          }          
        }
      } else {
        openSubsections = [];
      }

      return {
        ...prev,
        [sectionId]: {
          isOpen,
          openSubsections,
        }
      };
    });
  }, [setSectionsOpenState]);
  const checkIsOpen = useCallback((sectionId: string, subsectionId?: string): boolean => {
    if (sectionsOpenState === "auto") return true;
  
    if (sectionId && !subsectionId) {
      return sectionsOpenState[sectionId].isOpen;
    } else {
      return !!sectionsOpenState[sectionId].openSubsections?.includes(subsectionId!);
    }
  }, [sectionsOpenState]);

  useEffect(() => {
    if (isGetResumeLoading || !resume) return;

    const sectionsState = sectionNames.reduce((acc, name) => {
      const section = resume[name];
      if (!section) return acc;

      acc[section.id] = {
        isOpen: true,
        openSubsections: isSectionDefault(section) ? undefined : section.data.map(o => o.id),
      };
    
      return acc;
    }, {} as SectionsOpenState);

    setSectionsOpenState(sectionsState);
  }, [isGetResumeLoading]);

  if (isGetResumeLoading) return <ResumeEditorFormSkeleton className={className} />

  return (
    <div className={clsx(styles.form, className)}>
      <Head title={resume?.title} changeField={changeField} />

      <div className={styles.formSections}>
        <PersonalDetails
          sectionData={resume!.personalDetails}
          onChange={changeField}
          isOpen={checkIsOpen}
          onToggle={toggleSection}
        />

        <ProfessionalSummary
          sectionData={resume!.professionalSummary}
          onChange={changeField}
          isOpen={checkIsOpen}
          onToggle={toggleSection}
        />

        <EmploymentHistory
          sectionData={resume!.employmentHistory}
          onChange={changeField}
          isOpen={checkIsOpen}
          onToggle={toggleSection}
        />

        <Education 
          sectionData={resume!.education}
          onChange={changeField}
          isOpen={checkIsOpen}
          onToggle={toggleSection}
        />
      </div>
    </div>
  );
}