import React from "react";

import Section from "../Section";

import parse from 'html-react-parser';

import type { Hobbies } from "@/types/sectionTypes/sections";

interface ProfessionalSummaryProps {
  data: Hobbies;
}

export default React.memo(function Hobbies({ data }: ProfessionalSummaryProps) {
  const { title, defaultTitle, hobbyDescription } = data;
  
  if (!hobbyDescription) return null;

  return (
    <Section type="horizontalList" title={title ?? defaultTitle}>
      {parse(hobbyDescription)}
    </Section>
  );
})