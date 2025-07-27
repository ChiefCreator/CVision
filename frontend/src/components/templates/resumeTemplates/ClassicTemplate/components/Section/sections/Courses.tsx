import React from "react";

import Subsection from "../../Subsection/Subsection";
import Section from "../Section";
import SubsectionList from "../../SubsectionList/SubsectionList";

import { join } from "@/utils/stringUtils";
import { checkIsAllSubsectionsEmpty } from "@/utils/templateUtils/checkIsSubsectionEmpty";

import type { CourseSection } from "@/types/sectionTypes/sections";

interface CoursesProps {
  data: CourseSection;
}

export default React.memo(function Courses({ data }: CoursesProps) {
  const { title, defaultTitle, data: subsections } = data;

  if (checkIsAllSubsectionsEmpty(subsections)) return null;

  return (
    <Section type="columnList" title={title ?? defaultTitle}>
      <SubsectionList>
        {subsections?.map(({ id, title, institution, startDate, endDate }) => (
          <li key={id}>
            <Subsection
              title={join([title, institution])}
              date={join([startDate, endDate], " — ")}
            />
          </li>
        ))}
      </SubsectionList>
    </Section>
  );
})