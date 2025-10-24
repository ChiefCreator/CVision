import React from "react";

import Section from "../Section/Section";


import { checkIsAllSubsectionsDataEmpty } from "@/utils/template/checkIsAllSubsectionsDataEmpty";
import { StrictTemplateData } from "../../types/templateData";
import LabelValueBlock from "../LabelValueBlock";
import LabelValueBlockList from "../LabelValueBlockList";

export default React.memo(function Skills({ title, subsections }: StrictTemplateData["skills"]) {
  if (checkIsAllSubsectionsDataEmpty(subsections?.map(s => s.data))) return null;
    
  return (
    <Section type="row" title={title}>
      <LabelValueBlockList>
        {subsections?.map(({ id, data }) => (
          <LabelValueBlock
            key={id}
            label={data?.title}
            value={data?.level}
          />
        ))}
      </LabelValueBlockList>
    </Section>
  );
})