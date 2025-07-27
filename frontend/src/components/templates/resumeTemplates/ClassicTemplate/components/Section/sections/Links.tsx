import React from "react";

import Section from "../Section";

import { checkIsAllSubsectionsEmpty } from "@/utils/templateUtils/checkIsSubsectionEmpty";

import type { Link, LinkSection } from "@/types/sectionTypes/sections";

interface LinksProps {
  data?: LinkSection;
  joinLinks: (links: Link[]) => React.JSX.Element[] | undefined;
}

export default React.memo(function Links({ data, joinLinks }: LinksProps) {
  const { title, defaultTitle, data: subsections } = data || {};

  if (checkIsAllSubsectionsEmpty(subsections)) return null;

  return (
    <Section title={title || defaultTitle} type="horizontalList">
      {joinLinks(subsections!)}
    </Section>
  );
})