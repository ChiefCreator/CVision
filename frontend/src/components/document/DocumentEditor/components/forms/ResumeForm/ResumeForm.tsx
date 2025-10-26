"use client"

import EditorForm from "@/components/form/EditorForm/EditorForm";
import { FormProps } from "../../../compoundComponents/FormWrapper/FormWrapper";

import { DomainSectionProps } from "@/components/form/EditorForm/compoundComponents/Section/Section";
import Courses from "@/components/form/EditorForm/sections/Courses/Courses";
import CustomSection from "@/components/form/EditorForm/sections/CustomSection/CustomSection";
import Education from "@/components/form/EditorForm/sections/Education/Education";
import EmploymentHistory from "@/components/form/EditorForm/sections/EmploymentHistory/EmploymentHistory";
import ExtraCurricularActivities from "@/components/form/EditorForm/sections/ExtraCurricularActivities/ExtraCurricularActivities";
import Hobbies from "@/components/form/EditorForm/sections/Hobbies/Hobbies";
import Internships from "@/components/form/EditorForm/sections/Internships/Internships";
import Languages from "@/components/form/EditorForm/sections/Languages/Languages";
import Links from "@/components/form/EditorForm/sections/Links/Links";
import PersonalDetails from "@/components/form/EditorForm/sections/PersonalDetails/PersonalDetails";
import ProfessionalSummary from "@/components/form/EditorForm/sections/ProfessionalSummary/ProfessionalSummary";
import References from "@/components/form/EditorForm/sections/References/References";
import Skills from "@/components/form/EditorForm/sections/Skills/Skills";
import { SectionDataMap } from "@/types/document/section/sectionDataMap";
import { useDocumentEditorContext } from "../../../hooks/useDocumentEditorContext";

import clsx from "clsx";
import styles from "./ResumeForm.module.scss";

type SectionComponentType = React.ComponentType<DomainSectionProps<any>>;

const sectionsMap: Record<keyof SectionDataMap["resume"], SectionComponentType> = {
  courses: Courses,
  customSection: CustomSection,
  education: Education,
  employmentHistory: EmploymentHistory,
  extracurricularActivities: ExtraCurricularActivities,
  hobbies: Hobbies,
  internships: Internships,
  languages: Languages,
  links: Links,
  personalDetails: PersonalDetails,
  professionalSummary: ProfessionalSummary,
  references: References,
  skills: Skills,
};

export default function ResumeForm({ className }: FormProps) {
  const { document } = useDocumentEditorContext();

	return (
		<EditorForm
      className={clsx(styles.form, className)}
    >
      <EditorForm.Header className={styles.header} />

      <ul className={styles.sectionsList}>
        {document?.sections.sort((p, c) => p.order - c.order).map((section) => {
          const Section = sectionsMap[section.template.key] as React.ComponentType<DomainSectionProps>;
          
          if (!Section) return null;

          return (
            <li key={section.id}>
              <Section section={section} />
            </li>
          )
        })}
      </ul>

      <EditorForm.AddSection className={styles.addSection} />
    </EditorForm>
	)
}
