import React from "react";
import Section from "../Section";
import LabelValueBlockList from "../../LabelValueBlockList/LabelValueBlockList";

interface PersonalInformationProps {
  data: {
    birthDate?: string;
    birthPlace?: string;
    nationality?: string;
    drivingLicense?: string;
  };
}

export default React.memo(function PersonalInformation({ data }: PersonalInformationProps) {
  const { birthDate, birthPlace, nationality, drivingLicense } = data;

  if (!birthDate || !birthPlace || !nationality || !drivingLicense ) return null;

  return (
    <Section type="horizontalList">
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
