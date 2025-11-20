import React from "react";

import { Book, Brain, Briefcase, GraduationCap, KeySquare, Languages, Laptop, Link, LucideProps, Plane, Star, User } from "lucide-react";
import AddSectionItem from "./AddSectionItem/AddSectionItem";
import AddSectionSkeleton from "./AddSectionSkeleton";

import { useCreateSection } from "@/api/section/hooks/useCreateSection";
import { useGetRootSectionTemplates } from "@/api/sectionTemplate/hooks/useGetRootSectionTemplates";
import { useDocumentEditorContext } from "@/components/document/DocumentEditor/hooks/useDocumentEditorContext";
import { CreateSection } from "@/types/document/section/createSection";
import { SectionTemplate } from "@/types/document/sectionTemplate/sectionTemplate";
import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import { useEditorFormContext } from "../../hooks/useEditorFormContext";
import styles from "./AddSection.module.scss";

interface AddSectionProps extends BaseComponent {};

type SectionIconsMap = Record<string, React.ComponentType<LucideProps & React.RefAttributes<SVGSVGElement>>>;

const sectionIconsMap: SectionIconsMap = {
  employmentHistory: Briefcase,
  education: Book,
  links: Link,
  skills: KeySquare,
  languages: Languages,
  courses: GraduationCap,
  internships: Laptop,
  hobbies: Plane,
  extraCurricularActivities: Brain,
  references: Star,
  customSection: User,
}

export default function AddSection({ className }: AddSectionProps) {
  const { toggleSection } = useEditorFormContext();
  const { document, isGetLoading, changeIsAllUpdating } = useDocumentEditorContext();
  const { data: rootSectionTemplates, isLoading: isGetRootSectionTemplatesLoading } = useGetRootSectionTemplates({
    isRequired: false,
  });
  const { mutateAsync: createSection } = useCreateSection();

  const addSection = async (dto: CreateSection) => {
    changeIsAllUpdating(true);
    
    const section = await createSection(dto);

    toggleSection(section.id);
    changeIsAllUpdating(false);
  }

  if (isGetLoading || isGetRootSectionTemplatesLoading) return <AddSectionSkeleton />;

  return (
    <section className={clsx(styles.section, className)}>
      <header className={styles.head}>
        <h2 className={styles.title}>Добавить секцию</h2>
      </header>

      <ul className={styles.list}>
        {rootSectionTemplates?.map(({ id, title, key }: SectionTemplate) => (
          <li key={id}>
            <AddSectionItem
              title={title}
              Icon={sectionIconsMap[key]}
              isDisabled={!!document?.sections.find(s => (s.templateId === id && !s.template.isMultiple))}
              onClick={() => addSection({ documentId: document!.id, title, template: key })}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}