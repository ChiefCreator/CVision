import React from "react";

import { sortByOrder } from "@/utils/root/sortByOrder";
import { DomainSectionProps } from "../../compoundComponents/Section/Section";
import { SectionForm } from "../../compoundComponents/Section/SectionForm";
import LanguageSubsection from "../../subsections/LanguageSubsection";

export default React.memo(function Languages({ section }: DomainSectionProps<"resume", "languages">) {
  return (
    <SectionForm type="nested" section={section}>
      {({ subsections }) => (
        <>
          {sortByOrder(subsections).map(s => (
            <LanguageSubsection key={s.id} subsection={s} />
          ))}
        </>
      )}
    </SectionForm>
  );
})