import React from "react";

import SkillSubsection from "../../subsections/SkillSubsection";

import { sortByOrder } from "@/utils/root/sortByOrder";
import { DomainSectionProps } from "../../compoundComponents/Section/Section";
import { SectionForm } from "../../compoundComponents/Section/SectionForm";

export default React.memo(function Skills({ section }: DomainSectionProps<"resume", "skills">) {
  // const additionalContent = (
  //   <Toggle
  //     isActive={sectionData?.isShowLevel}
  //     label={["Показать уровень навыков", "Скрыть уровнь навыков"]}
  //     onChange={changeObj.isShowLevel}
  //   />
  // );

  return (
    <SectionForm type="nested" section={section}>
      {({ subsections }) => (
        <>
          {sortByOrder(subsections).map(s => (
            <SkillSubsection key={s.id} subsection={s} />
          ))}
        </>
      )}
    </SectionForm>
  );
})