import React from "react";
import Section from "../Section";
import LabelValueBlockList from "../../LabelValueBlockList/LabelValueBlockList";
import { ClassicTemplateSectionsMap } from "../../../types/section";

interface PersonalInformationProps {
  data: ClassicTemplateSectionsMap["personalInformation"];
}

export default React.memo(function PersonalInformation({ data }: PersonalInformationProps) {
  const { id, birthDate, birthPlace, nationality, drivingLicense } = data;

  if (!birthDate && !birthPlace && !nationality && !drivingLicense ) return null;

  return (
    <Section type="horizontalList" id={id} name="personalInformation">
      <LabelValueBlockList
        data={[
          { label: "Дата рождения", value: birthDate },
          { label: "Место рождения", value: birthPlace },
          { label: "Национальность", value: nationality },
          { label: "Водительское удостоверение", value: drivingLicense },
        ]}
      />
    </Section>
  );
})
