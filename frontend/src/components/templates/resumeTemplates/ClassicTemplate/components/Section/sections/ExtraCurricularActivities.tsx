import React from "react";

import Subsection from "../../Subsection/Subsection";
import Section from "../Section";
import SubsectionList from "../../SubsectionList/SubsectionList";

import { join } from "@/utils/stringUtils";
import { checkIsAllSubsectionsEmpty } from "@/utils/templateUtils/checkIsSubsectionEmpty";

import type { ExtraCurricularActivitySection } from "@/types/sectionTypes/sections";

interface ExtraCurricularActivitiesProps {
  data: ExtraCurricularActivitySection;
}

export default React.memo(function ExtraCurricularActivities({ data }: ExtraCurricularActivitiesProps) {
  const { title, defaultTitle, data: subsections } = data;

  if (checkIsAllSubsectionsEmpty(subsections)) return null;

  return (
    <Section type="columnList" title={title ?? defaultTitle}>
      <SubsectionList>
        {subsections?.map(({ id, functionTitle, employer, startDate, endDate, description, city }) => (
          <li key={id}>
            <Subsection
              title={join([functionTitle, employer])}
              date={join([startDate, endDate], " — ")}
              description={description}
              meta={city}
            />
          </li>
        ))}
      </SubsectionList>
    </Section>
  );
})