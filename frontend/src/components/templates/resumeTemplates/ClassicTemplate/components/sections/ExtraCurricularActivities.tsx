import React from "react";

import Section from "../Section/Section";
import Subsection from "../Subsection";

import { join } from "@/utils/string/join";

import { checkIsAllSubsectionsDataEmpty } from "@/utils/template/checkIsAllSubsectionsDataEmpty";
import { StrictTemplateData } from "../../types/templateData";
import SubsectionList from "../SubsectionList";

export default React.memo(function ExtraCurricularActivities({ title, subsections }: StrictTemplateData["extracurricularActivities"]) {
  if (checkIsAllSubsectionsDataEmpty(subsections.map(s => s.data))) return null;
    
  return (
    <Section type="column" title={title}>
      <SubsectionList>
        {subsections?.map(({ id, data }) => (
          <Subsection
            key={id}
            title={join([data?.functionTitle, data?.employer])}
            date={join([data?.startDate, data?.endDate], " — ")}
            description={data?.description}
            meta={data?.city}
          />
        ))}
      </SubsectionList>
    </Section>
  );
})