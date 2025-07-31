import React from "react";

import Section from "../Section";

import { languages } from "@/constants/root/languages";
import { checkIsAllSubsectionsEmpty } from "@/utils/template/checkIsSubsectionEmpty";

import type { LanguageSection } from "@/types/resumeSection/sections";
import LabelValueBlockList from "../../LabelValueBlockList/LabelValueBlockList";

interface LanguagesProps {
  data: LanguageSection;
}

export default React.memo(function Languages({ data }: LanguagesProps) {
  const { id, title, defaultTitle, data: subsections } = data;

  if (checkIsAllSubsectionsEmpty(subsections)) return null;

  return (
    <Section type="horizontalList" title={title ?? defaultTitle} id={id} name="languages">
      <LabelValueBlockList
        data={subsections.map(({ title, level }) => ({ label: title, value: languages.find(({ value }) => value === level)?.label }))}
      />
    </Section>
  );
})