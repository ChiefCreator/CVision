import React from "react";

import Head from "./components/Section/sections/Head/Head";
import PersonalInformation from "./components/Section/sections/PersonalInformation";
import Links from "./components/Section/sections/Links";

import { CLASSIC_TEMPLATE_REORDERED_SECTION_COMPONENTS_MAP } from "./constants/reorderedSectionsMap";

import styles from "./ClassicTemplate.module.scss";
import clsx from "clsx";
import { pt_serif } from "./fonts/PT_Serif";
import { montserrat } from "./fonts/Montserrat";
import { getReorderedDataItems } from "./utils/getReorderedDataItems";
import { ClassicTemplateData } from "./types/data";
import { isTypeOfSection } from "./utils/isTypeOfSection";
import { ClassicTemplateReorderedSectionComponentProps } from "./types/reorderedTypes";

interface ClassicTemplateProps {
  data: ClassicTemplateData;
}

export default React.memo(function ClassicTemplate({ data }: ClassicTemplateProps) {
  const headData = data.find(s => isTypeOfSection(s, "head"))?.data;
  const personalInformationData = data.find(s => isTypeOfSection(s, "personalInformation"))?.data;
  const linksData = data.find(s => isTypeOfSection(s, "links"))?.data;

  const reorderedDataItems = getReorderedDataItems(data);

  return (
    <div className={clsx(styles.template, pt_serif.variable, montserrat.variable)}>
      {headData && <Head data={headData} />}

      <ul className={styles.sections}>
        {personalInformationData && <li><PersonalInformation data={personalInformationData} /></li>}
        {linksData && <li><Links data={linksData} /></li>}

        {reorderedDataItems.map(({ data, name }) => {
          const Section = CLASSIC_TEMPLATE_REORDERED_SECTION_COMPONENTS_MAP[name] as React.ComponentType<ClassicTemplateReorderedSectionComponentProps<typeof name>>;
          if (!Section || !data) return null;

          return <li key={data.id}><Section data={data} /></li>;
        })}
      </ul>
    </div>
  );
})