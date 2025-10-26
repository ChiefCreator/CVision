import React from "react";

import { sortByOrder } from "@/utils/root/sortByOrder";
import { DomainSectionProps } from "../../compoundComponents/Section/Section";
import { SectionForm } from "../../compoundComponents/Section/SectionForm";
import InternshipSubsection from "../../subsections/InternshipSubsection";

export default React.memo(function Internships({ section }: DomainSectionProps<"resume", "internships">){
  return (
    <SectionForm type="nested" section={section}>
      {({ subsections }) => (
        <>
          {sortByOrder(subsections).map(s => (
            <InternshipSubsection key={s.id} subsection={s} />
          ))}
        </>
      )}
    </SectionForm>
  );
})