import React from "react";

import Section from "../Section/Section";

import parse from 'html-react-parser';
import { StrictTemplateData } from "../../types/templateData";

export default React.memo(function ProfessionalSummary({ title, data }: StrictTemplateData["professionalSummary"]) {
  if (!data?.summary) return null;

  return (
    <Section type="row" title={title}>
      {parse(data.summary)}
    </Section>
  );
})