import React from "react";

import Subsection from "../../Subsection/Subsection";
import Section from "../Section";
import SubsectionList from "../../SubsectionList/SubsectionList";

import { join } from "@/utils/stringUtils";
import { checkIsAllSubsectionsEmpty } from "@/utils/templateUtils/checkIsSubsectionEmpty";

import type { EmploymentHistorySection } from "@/types/sectionTypes/sections";

interface EmploymentHistoryProps {
  data: EmploymentHistorySection;
}

export default React.memo(function EmploymentHistory({ data }: EmploymentHistoryProps) {
  const { title, defaultTitle, data: subsections } = data;
    
  if (checkIsAllSubsectionsEmpty(subsections)) return null;

  return (
    <Section type="columnList" title={title ?? defaultTitle}>
      <SubsectionList>
        {subsections?.map(({ id, jobTitle, employer, startDate, endDate, description, city }) => (
          <li key={id}>
            <Subsection
              title={join([jobTitle, employer])}
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