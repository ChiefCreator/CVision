import React from "react";

import Subsection from "../../Subsection/Subsection";
import Section from "../Section";
import SubsectionList from "../../SubsectionList/SubsectionList";

import { join } from "@/utils/stringUtils";
import { checkIsAllSubsectionsEmpty } from "@/utils/templateUtils/checkIsSubsectionEmpty";

import type { CustomSection } from "@/types/sectionTypes/sections";

interface CustomSectionProps {
  data: CustomSection;
}

export default React.memo(function CustomSection({ data }: CustomSectionProps) {
  const { title, defaultTitle, data: subsections } = data;

  if (checkIsAllSubsectionsEmpty(subsections)) return null;

  return (
    <Section type="columnList" title={title ?? defaultTitle}>
      <SubsectionList>
        {subsections?.map(({ id, title, city, description, startDate, endDate }) => (
          <li key={id}>
            <Subsection
              title={title}
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