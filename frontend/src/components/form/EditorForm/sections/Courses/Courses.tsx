import React from "react";

import CourseSubsection from "../../subsections/CourseSubsection";

import { sortByOrder } from "@/utils/root/sortByOrder";

import { DomainSectionProps } from "../../compoundComponents/Section/Section";

import { SectionForm } from "../../compoundComponents/Section/SectionForm";

export default React.memo(function Courses({ section }: DomainSectionProps<"resume", "courses">) {
  return (
    <SectionForm type="nested" section={section}>
      {({ subsections }) => (
        <>
          {sortByOrder(subsections).map(s => (
            <CourseSubsection key={s.id} subsection={s} />
          ))}
        </>
      )}
    </SectionForm>
  );
})