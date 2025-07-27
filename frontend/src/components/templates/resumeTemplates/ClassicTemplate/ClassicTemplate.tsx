import React, { useCallback, useMemo } from "react";

import PersonalInformation from "./components/Section/sections/PersonalInformation";
import Links from "./components/Section/sections/Links";

import { reorderedSectionsMap } from "./constants/reorderedSectionsMap";
import { reorderedSectionNames } from "./constants/reorderedSectionNames";
import { join } from "@/utils/stringUtils";
import { resumeToSections } from "@/utils/resumeUtils/resumeToSections";
import { isReorderedSectionName } from "./utils/isReorderedSectionName";

import type { ResumeTemplateProps } from "@/types/resumeTypes/template";
import type { Link } from "@/types/sectionTypes/sections";
import type { ReorderedSectionProps } from "./types/reorderedSection";

import styles from "./ClassicTemplate.module.scss";
import clsx from "clsx";
import { pt_serif } from "./fonts/PT_Serif";
import { montserrat } from "./fonts/Montserrat";

export default React.memo(function ClassicTemplate({ data }: ResumeTemplateProps) {
  const personalDetails = data.personalDetails;
  const personalInformation = useMemo(() => ({
    birthDate: personalDetails?.birthDate,
    birthPlace: personalDetails?.birthPlace,
    nationality: personalDetails?.nationality,
    drivingLicense: personalDetails?.drivingLicense,
  }), [personalDetails?.birthDate, personalDetails?.birthPlace, personalDetails?.nationality, personalDetails?.drivingLicense]);
  const reorderedSections = resumeToSections(data, reorderedSectionNames);

  const joinLinks = useCallback((links?: Link[]) => {
    const linkElements = links?.map(({ label, url }) => {
      if (!url || !label) return null;

      return <a className={styles.link} href={url}>{label}</a>
    })?.filter(Boolean);

    return linkElements?.map((el, i) => <span key={i}>{el}{linkElements.length !== i + 1 ? ", " : ""}</span>);
  }, []);

  return (
    <div className={clsx(styles.template, pt_serif.variable, montserrat.variable)}>
      <header className={styles.header}>
        <h1 className={styles.title}>{join([personalDetails?.fullName, personalDetails?.jobTitle])}</h1>

        <p className={styles.addressAndContact}>
          {join([
            personalDetails?.address, personalDetails?.city,
            personalDetails?.postalCode, personalDetails?.country,
            personalDetails?.phone, personalDetails?.email
          ])}
        </p>
      </header>

      <ul className={styles.sections}>
        <li><PersonalInformation data={personalInformation} /></li>
        <li><Links data={data.links} joinLinks={joinLinks} /></li>

        {reorderedSections?.map(({ data, name }) => {
          if (isReorderedSectionName(name)) {
            const Section = reorderedSectionsMap[name] as React.ComponentType<ReorderedSectionProps<typeof name>> | null;
            if (!Section || !data) return null;

            return <li key={data.id}><Section data={data} /></li>;
          }
        })}
      </ul>
    </div>
  );
})