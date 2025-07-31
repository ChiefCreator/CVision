import React from "react";

import Subsection from "../../Subsection/Subsection";
import Section from "../Section";
import SubsectionList from "../../SubsectionList/SubsectionList";

import { join } from "@/utils/string/join";
import { checkIsAllSubsectionsEmpty } from "@/utils/template/checkIsSubsectionEmpty";

import type { EducationSection } from "@/types/resumeSection/sections";

interface EducationProps {
  data: EducationSection;
}

export default React.memo(function Education({ data }: EducationProps) {
  const { id, title, defaultTitle, data: subsections } = data;

  if (checkIsAllSubsectionsEmpty(subsections)) return null;

  return (
    <Section type="columnList" title={title ?? defaultTitle} id={id} name="education">
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