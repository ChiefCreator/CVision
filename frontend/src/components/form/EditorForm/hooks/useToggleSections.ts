import { Document } from "@/types/document/document";
import { Section } from "@/types/document/section/section";
import { useCallback, useEffect, useMemo, useState } from "react";

type SectionsOpenState = {
  [sectionId: string]: {
    isOpen: boolean;
    openSubsections?: string[];
  };
};

interface UseToggleSectionsProps {
  document: Document;
  isGetLoading: boolean;
}

export function useToggleSections({ document, isGetLoading }: UseToggleSectionsProps) {
	const [sectionsOpenState, setSectionsOpenState] = useState<SectionsOpenState | "auto">("auto");

  const toggleSection = useCallback((sectionId: string, subsectionId?: string, open?: boolean) => {
    setSectionsOpenState(prev => {
      if (prev === "auto") prev = {};

      const sectionState = prev[sectionId];
      const isOpen = subsectionId ? sectionState?.isOpen : !sectionState?.isOpen;

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
    if (isGetLoading || !document) return;

    const sectionsState = document.sections.reduce((acc, section) => {
      if (!section) return acc;

      acc[section.id] = {
        isOpen: true,
        openSubsections: section.subsections.map((s: Section) => s.id),
      };
    
      return acc;
    }, {} as SectionsOpenState);

    setSectionsOpenState(sectionsState);
  }, [isGetLoading]);

  return useMemo(() => ({
    toggleSection,
    checkIsOpen,
  }), [toggleSection, checkIsOpen]);
}