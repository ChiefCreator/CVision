import React from "react";

import Subsection from "../../Subsection/Subsection";
import Section from "../Section";
import SubsectionList from "../../SubsectionList/SubsectionList";

import { join } from "@/utils/string/join";
import { checkIsAllSubsectionsEmpty } from "@/utils/template/checkIsSubsectionEmpty";

import type { ExtraCurricularActivitySection } from "@/types/resumeSection/sections";

interface ExtraCurricularActivitiesProps {
  data: ExtraCurricularActivitySection;
}

export default React.memo(function ExtraCurricularActivities({ data }: ExtraCurricularActivitiesProps) {
  const { id, title, defaultTitle, data: subsections } = data;

  if (checkIsAllSubsectionsEmpty(subsections)) return null;

  return (
    <Section type="columnList" title={title ?? defaultTitle} id={id} name="extraCurricularActivities">
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