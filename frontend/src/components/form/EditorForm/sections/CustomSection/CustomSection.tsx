import React from "react";

import { sortByOrder } from "@/utils/root/sortByOrder";

import { DomainSectionProps } from "../../compoundComponents/Section/Section";
import { SectionForm } from "../../compoundComponents/Section/SectionForm";
import CustomSubsection from "../../subsections/CustomSubsection";

export default React.memo(function CustomSection({ section }: DomainSectionProps<"resume", "courses">) {
  return (
    <SectionForm type="nested" section={section}>
      {({ subsections }) => (
        <>
          {sortByOrder(subsections).map(s => (
            <CustomSubsection key={s.id} subsection={s} />
          ))}
        </>
      )}
    </SectionForm>
  );
})