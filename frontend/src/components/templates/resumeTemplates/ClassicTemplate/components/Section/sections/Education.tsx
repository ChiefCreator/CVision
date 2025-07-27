import React from "react";

import Subsection from "../../Subsection/Subsection";
import Section from "../Section";
import SubsectionList from "../../SubsectionList/SubsectionList";

import { join } from "@/utils/stringUtils";
import { checkIsAllSubsectionsEmpty } from "@/utils/templateUtils/checkIsSubsectionEmpty";

import type { EducationSection } from "@/types/sectionTypes/sections";

interface EducationProps {
  data: EducationSection;
}

export default React.memo(function Education({ data }: EducationProps) {
  const { title, defaultTitle, data: subsections } = data;

  if (checkIsAllSubsectionsEmpty(subsections)) return null;

  return (
    <Section type="columnList" title={title ?? defaultTitle}>
      <SubsectionList>
        {subsections?.map(({ id, school, degree, startDate, endDate, description, city }) => (
          <li key={id}>
            <Subsection
              title={join([school, degree])}
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