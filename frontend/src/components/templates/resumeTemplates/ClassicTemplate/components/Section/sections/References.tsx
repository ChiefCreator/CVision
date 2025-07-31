import React from "react";

import Subsection from "../../Subsection/Subsection";
import Section from "../Section";
import SubsectionList from "../../SubsectionList/SubsectionList";

import { join } from "@/utils/string/join";
import { checkIsAllSubsectionsEmpty } from "@/utils/template/checkIsSubsectionEmpty";

import type { ReferenceSection } from "@/types/resumeSection/sections";

interface ReferencesProps {
  data: ReferenceSection;
}

export default React.memo(function References({ data }: ReferencesProps) {
  const { id, title, defaultTitle, data: subsections } = data;

  if (checkIsAllSubsectionsEmpty(subsections)) return null;

  return (
    <Section type="columnList" title={title ?? defaultTitle} id={id} name="references">
      <SubsectionList>
        {subsections?.map(({ id, referentFullName, company, phone, email }) => (
          <li key={id}>
            <Subsection
              title={join([referentFullName, company], " из ")}
              description={join([email, phone])}
            />
          </li>
        ))}
      </SubsectionList>
    </Section>
  );
})