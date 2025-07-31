import React from "react";

import Subsection from "../../Subsection/Subsection";
import Section from "../Section";
import SubsectionList from "../../SubsectionList/SubsectionList";

import { join } from "@/utils/string/join";
import { checkIsAllSubsectionsEmpty } from "@/utils/template/checkIsSubsectionEmpty";

import type { CustomSection } from "@/types/resumeSection/sections";

interface CustomSectionProps {
  data: CustomSection;
}

export default React.memo(function CustomSection({ data }: CustomSectionProps) {
  const { id, title, defaultTitle, data: subsections } = data;

  if (checkIsAllSubsectionsEmpty(subsections)) return null;

  return (
    <Section type="columnList" title={title ?? defaultTitle} id={id} name="customSections">
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