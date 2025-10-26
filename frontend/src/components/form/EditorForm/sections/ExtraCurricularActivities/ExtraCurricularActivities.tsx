import React from "react";

import ExtraCurricularActivitySubsection from "../../subsections/ExtraCurricularActivitySubsection";

import { sortByOrder } from "@/utils/root/sortByOrder";
import { DomainSectionProps } from "../../compoundComponents/Section/Section";
import { SectionForm } from "../../compoundComponents/Section/SectionForm";

export default React.memo(function ExtraCurricularActivities({ section }: DomainSectionProps<"resume", "extracurricularActivities">) {
  return (
    <SectionForm type="nested" section={section}>
      {({ subsections }) => (
        <>
          {sortByOrder(subsections).map(s => (
            <ExtraCurricularActivitySubsection key={s.id} subsection={s} />
          ))}
        </>
      )}
    </SectionForm>
  );
})