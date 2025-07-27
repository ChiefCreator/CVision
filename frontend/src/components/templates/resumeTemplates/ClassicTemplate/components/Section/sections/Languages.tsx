import React from "react";

import Section from "../Section";

import { languages } from "@/constants/languages";
import { checkIsAllSubsectionsEmpty } from "@/utils/templateUtils/checkIsSubsectionEmpty";

import type { LanguageSection } from "@/types/sectionTypes/sections";
import LabelValueBlockList from "../../LabelValueBlockList/LabelValueBlockList";

interface LanguagesProps {
  data: LanguageSection;
}

export default React.memo(function Languages({ data }: LanguagesProps) {
  const { title, defaultTitle, data: subsections } = data;

  if (checkIsAllSubsectionsEmpty(subsections)) return null;

  return (
    <Section type="horizontalList" title={title ?? defaultTitle}>
      <LabelValueBlockList
        data={subsections.map(({ title, level }) => ({ label: title, value: languages.find(({ value }) => value === level)?.label }))}
      />
    </Section>
  );
})