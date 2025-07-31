import React from "react";

import Section from "../Section";

import { checkIsAllSubsectionsEmpty } from "@/utils/template/checkIsSubsectionEmpty";

import type { LinkSection } from "@/types/resumeSection/sections";
import type { Link } from "@/types/resumeSubsection/subsections";

interface LinksProps {
  data?: LinkSection;
}

const joinLinks = (links?: Link[]) => {
  const linkElements = links?.map(({ label, url }) => {
    if (!url || !label) return null;

    return <a href={url} style={{ textDecoration: "underline" }}>{label}</a>
  })?.filter(Boolean);

  return linkElements?.map((el, i) => <span key={i}>{el}{linkElements.length !== i + 1 ? ", " : ""}</span>);
}

export default React.memo(function Links({ data }: LinksProps) {
  const { id, title, defaultTitle, data: subsections } = data || {};

  if (checkIsAllSubsectionsEmpty(subsections)) return null;

  return (
    <Section title={title || defaultTitle} type="horizontalList" id={id!} name="links">
      {joinLinks(subsections!)}
    </Section>
  );
})