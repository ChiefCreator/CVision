import React from "react";

import Section from "../Section/Section";

import parse from 'html-react-parser';

import { StrictTemplateData } from "../../types/templateData";

export default React.memo(function Hobbies({ title, data }: StrictTemplateData["hobbies"]) {
  if (!data?.hobbyDescription) return null;

  return (
    <Section type="row" title={title}>
      {parse(data?.hobbyDescription)}
    </Section>
  );
})