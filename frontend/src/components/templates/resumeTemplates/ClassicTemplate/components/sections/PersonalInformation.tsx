import React from "react";

import { TemplateData } from "../../types/templateData";
import LabelValueBlock from "../LabelValueBlock";
import LabelValueBlockList from "../LabelValueBlockList";
import Section from "../Section/Section";

export default React.memo(function PersonalInformation({ data }: TemplateData["personalInformation"]) {
  const { birthDate, birthPlace, nationality, drivingLicense } = data;

  if (!birthDate && !birthPlace && !nationality && !drivingLicense ) return null;

  return (
    <Section type="row">
      <LabelValueBlockList>
        <LabelValueBlock label="Дата рождения" value={birthDate} />
        <LabelValueBlock label="Место рождения" value={birthPlace} />
        <LabelValueBlock label="Национальность" value={nationality} />
        <LabelValueBlock label="Водительское удостоверение" value={drivingLicense} />
      </LabelValueBlockList>
    </Section>
  );
})
