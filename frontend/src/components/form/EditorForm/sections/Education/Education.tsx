import React from "react";

import { DomainSectionProps } from "../../compoundComponents/Section/Section";

import { sortByOrder } from "@/utils/root/sortByOrder";
import { SectionForm } from "../../compoundComponents/Section/SectionForm";
import EducationSubsection from "../../subsections/EducationSubsection";

export default React.memo(function Courses({ section }: DomainSectionProps<"resume", "education">) {
  return (
    <SectionForm type="nested" section={section}>
      {({ subsections }) => (
        <>
          {sortByOrder(subsections).map(s => (
            <EducationSubsection key={s.id} subsection={s} />
          ))}
        </>
      )}
    </SectionForm>
  );
})