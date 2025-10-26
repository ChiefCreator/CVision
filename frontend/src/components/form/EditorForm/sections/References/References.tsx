import React from "react";

import { sortByOrder } from "@/utils/root/sortByOrder";
import { DomainSectionProps } from "../../compoundComponents/Section/Section";
import { SectionForm } from "../../compoundComponents/Section/SectionForm";
import ReferenceSubsection from "../../subsections/ReferenceSubsection";

export default React.memo(function References({ section }: DomainSectionProps<"resume", "references">) {
  return (
    <SectionForm type="nested" section={section}>
      {({ subsections }) => (
        <>
          {sortByOrder(subsections).map(s => (
            <ReferenceSubsection key={s.id} subsection={s} />
          ))}
        </>
      )}
    </SectionForm>
  );
})