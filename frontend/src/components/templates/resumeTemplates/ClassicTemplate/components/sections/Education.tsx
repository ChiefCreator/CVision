import React from "react";

import Section from "../Section/Section";

import { join } from "@/utils/string/join";
import { checkIsAllSubsectionsDataEmpty } from "@/utils/template/checkIsAllSubsectionsDataEmpty";

import { StrictTemplateData } from "../../types/templateData";
import Subsection from "../Subsection";
import SubsectionList from "../SubsectionList";

export default React.memo(function Education({ title, subsections }: StrictTemplateData["education"]) {
  if (checkIsAllSubsectionsDataEmpty(subsections.map(s => s.data))) return null;
  
  return (
    <Section type="column" title={title}>
      <SubsectionList>
        {subsections?.map(({ id, data }) => (
          <Subsection
            key={id}
            title={join([data?.school, data?.degree])}
            date={join([data?.startDate, data?.endDate], " — ")}
            description={data?.description}
            meta={data?.city}
          />
        ))}
      </SubsectionList>
    </Section>
  );
})