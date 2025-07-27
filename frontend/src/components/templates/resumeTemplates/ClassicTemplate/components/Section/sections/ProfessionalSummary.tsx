import React from "react";

import Section from "../Section";

import parse from 'html-react-parser';

import type { ProfessionalSummary } from "@/types/sectionTypes/sections";

interface ProfessionalSummaryProps {
  data: ProfessionalSummary;
}

export default React.memo(function ProfessionalSummary({ data }: ProfessionalSummaryProps) {
  if (!data.summary) return null;

  return (
    <Section type="horizontalList" title={data.title ?? data.defaultTitle}>
      {parse(data.summary)}
    </Section>
  );
})