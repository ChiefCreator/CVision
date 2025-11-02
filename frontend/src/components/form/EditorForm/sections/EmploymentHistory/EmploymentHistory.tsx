import { sortByOrder } from "@/utils/root/sortByOrder";
import React from "react";
import { DomainSectionProps } from "../../compoundComponents/Section/Section";
import { SectionForm } from "../../compoundComponents/Section/SectionForm";
import EmploymentHistorySubsection from "../../subsections/EmploymentHistorySubsection";

export default React.memo(function EmploymentHistory({ section }: DomainSectionProps<"resume", "employmentHistory">) {
  return (
    <SectionForm type="nested" section={section}>
      {({ subsections }) => (
        <>
          {sortByOrder(subsections).map(s => (
            <EmploymentHistorySubsection key={s.id} subsection={s} />
          ))}
        </>
      )}
    </SectionForm>
  );
})