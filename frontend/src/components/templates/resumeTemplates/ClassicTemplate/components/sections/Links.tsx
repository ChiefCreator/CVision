import React from "react";

import { checkIsAllSubsectionsDataEmpty } from "@/utils/template/checkIsAllSubsectionsDataEmpty";
import { StrictTemplateData } from "../../types/templateData";
import Section from "../Section/Section";

const joinLinks = (links: { id: string; url?: string; label?: string; }[]) => {
  const linkElements = links.map(({ id, url, label }) => {
    if (!url || !label) return null;

    return <a key={id} href={url} style={{ textDecoration: "underline" }}>{label}</a>
  }).filter(Boolean);

  return linkElements.map((el, i) => <span key={el?.key}>{el}{linkElements.length !== i + 1 ? ", " : ""}</span>);
}

export default React.memo(function Links({ title, subsections }: StrictTemplateData["links"]) {
  if (checkIsAllSubsectionsDataEmpty(subsections.map(s => s.data))) return null;
    
  return (
    <Section title={title} type="row">
      {joinLinks(subsections.map(({ id, data }) => ({ id, ...data })))}
    </Section>
  );
})