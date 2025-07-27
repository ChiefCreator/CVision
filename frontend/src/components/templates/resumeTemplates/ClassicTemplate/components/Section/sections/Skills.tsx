import React from "react";

import Section from "../Section";

import { skills } from "@/data/skills";
import { checkIsAllSubsectionsEmpty } from "@/utils/templateUtils/checkIsSubsectionEmpty";

import type { SkillSection } from "@/types/sectionTypes/sections";
import LabelValueBlockList from "../../LabelValueBlockList/LabelValueBlockList";

interface SkillsProps {
  data: SkillSection;
}

export default React.memo(function Skills({ data }: SkillsProps) {
  const { title, defaultTitle, isShowLevel, data: subsections } = data;

  if (checkIsAllSubsectionsEmpty(subsections)) return null;

  return (
    <Section type="horizontalList" title={title ?? defaultTitle}>
      <LabelValueBlockList
        data={subsections.map(({ title, level }) => ({ label: title, value: skills.find(({ value }) => value == level)?.label }))}
        isShowLevel={isShowLevel}
      />
    </Section>
  );
})