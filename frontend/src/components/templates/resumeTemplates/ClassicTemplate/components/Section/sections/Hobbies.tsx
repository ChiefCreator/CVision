import React from "react";

import Section from "../Section";

import parse from 'html-react-parser';

import type { Hobbies } from "@/types/resumeSection/sections";

interface ProfessionalSummaryProps {
  data: Hobbies;
}

export default React.memo(function Hobbies({ data }: ProfessionalSummaryProps) {
  const { id, title, defaultTitle, hobbyDescription } = data;
  
  if (!hobbyDescription) return null;

  return (
    <Section type="horizontalList" title={title ?? defaultTitle} id={id} name="hobbies">
      {parse(hobbyDescription)}
    </Section>
  );
})