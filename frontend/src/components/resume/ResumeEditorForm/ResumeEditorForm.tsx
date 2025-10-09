import { useResume } from "@/hooks/resume/useResume";
import { useCallback, useEffect, useState } from "react";

import AddSection from "./AddSection/AddSection";
import Head from "./Head/Head";
import ResumeEditorFormSkeleton from "./ResumeEditorFormSkeleton";

import { SECTION_NAMES } from "@/constants/resumeSection/sectionNames";
import { SECTION_COMPONENTS_MAP } from "../../../constants/resumeSection/sectionComponentsMap";

import { resumeToSections } from "@/utils/resume/resumeToSections";
import { isListResumeSectionByData } from "@/utils/resumeSection/isResumeSection";

import type { SectionComponentProps } from "@/types/resumeSection/section";
import type { BaseComponent } from "@/types/root";

import clsx from "clsx";
import styles from "./ResumeEditorForm.module.scss";

interface ResumeEditorForm extends BaseComponent {}

type SectionsOpenState = {
  [sectionId: string]: {
    isOpen: boolean;
    openSubsections?: string[];
  };
};

export default function ResumeEditorForm({ className }: ResumeEditorForm) {
  const { resume, changeField, isResumeLoading, isResumeError } = useResume();
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
    if (isResumeLoading || !resume) return;

    const sectionsState = SECTION_NAMES.reduce((acc, name) => {
      const section = resume[name];
      if (!section) return acc;

      if (Array.isArray(section)) {
        section.forEach(section => {
          acc[section.id] = {
            isOpen: true,
            openSubsections: isListResumeSectionByData(section) ? section.data.map(o => o.id) : undefined,
          };
        })
      } else {
        acc[section.id] = {
          isOpen: true,
          openSubsections: isListResumeSectionByData(section) ? section.data.map(o => o.id) : undefined,
        };
      }
    
      return acc;
    }, {} as SectionsOpenState);

    setSectionsOpenState(sectionsState);
  }, [isResumeLoading]);

  if (isResumeLoading) return <ResumeEditorFormSkeleton className={className} />;
  if (isResumeError || !resume) return <>Error</>;

  return (
    <div className={clsx(styles.form, className)}>
      <Head title={resume?.title} changeField={changeField} />

      <section className={styles.formSections}>
        <ul className={styles.sectionsList}>
          {resumeToSections(resume).map(({ data, name }) => {
            const Section = SECTION_COMPONENTS_MAP[name] as React.ComponentType<SectionComponentProps<typeof name>> | null;
            if (!Section || !data) return null;
  
            return (
              <li key={data.id}>
                <Section 
                  sectionData={data}
                  onChange={changeField}
                  isOpen={checkIsOpen}
                  onToggle={toggleSection}
                />
              </li>
            )
          })}
        </ul>
      </section>

      <AddSection resume={resume} toggleSection={toggleSection} />
    </div>
  );
}