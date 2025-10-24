import React from "react";

import Section from "../Section/Section";
import Subsection from "../Subsection";
import SubsectionList from "../SubsectionList";

import { join } from "@/utils/string/join";
import { checkIsAllSubsectionsDataEmpty } from "@/utils/template/checkIsAllSubsectionsDataEmpty";

import { StrictTemplateData } from "../../types/templateData";

export default React.memo(function EmploymentHistory({ title, subsections }: StrictTemplateData["employmentHistory"]) {
  if (checkIsAllSubsectionsDataEmpty(subsections.map(s => s.data))) return null;
  
  return (
    <Section type="column" title={title}>
      <SubsectionList>
        {subsections?.map(({ id, data }) => (
          <Subsection
            key={id}
            title={join([data?.jobTitle, data?.employer])}
            date={join([data?.startDate, data?.endDate], " — ")}
            description={data?.description}
            meta={data?.city}
          />
        ))}
      </SubsectionList>
    </Section>
  );
})