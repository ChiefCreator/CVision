import React from "react";

import LinkSubsection from "../../subsections/LinkSubsection";

import { sortByOrder } from "@/utils/root/sortByOrder";
import { DomainSectionProps } from "../../compoundComponents/Section/Section";
import { SectionForm } from "../../compoundComponents/Section/SectionForm";

export default React.memo(function Links({ section }: DomainSectionProps<"resume", "links">) {
  return (
    <SectionForm type="nested" section={section}>
      {({ subsections }) => (
        <>
          {sortByOrder(subsections).map(s => (
            <LinkSubsection key={s.id} subsection={s} />
          ))}
        </>
      )}
    </SectionForm>
  );
})