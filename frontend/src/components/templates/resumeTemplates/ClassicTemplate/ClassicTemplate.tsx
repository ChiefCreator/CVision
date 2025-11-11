import { Document } from "@/types/document/document";
import React, { CSSProperties, useMemo } from "react";

import PersonalInformation from "./components/sections/PersonalInformation";
import { adaptDocument } from "./utils/adaptDocument";

import Links from "./components/sections/Links";
import { templateSectionsMap } from "./constants/templateSectionsMap";
import { TemplateSectionName } from "./types/templateSectionName";

import Head from "./components/Head";

import { createStyles } from "@/utils/styles/createStyles";

interface ClassicTemplateProps {
  data: Document<"resume">;
}

export default React.memo(function ClassicTemplate({ data: documentData }: ClassicTemplateProps) {
  const {
    head,
    personalInformation,
    links,
    ...otherSectionsData
  } = adaptDocument(documentData);
  const { font, size, spacing } = documentData.settings;

  const styles = useMemo(() => createStyles({
    template: {
      "--color-primary": "black",
      "--color-contrast": "black",
      "--color-contrast--light": "rgb(69, 69, 69)",

      "--font-primary": font.primary.currentOption.value,
      "--font-size": `${12 * (size.currentOption.value || 1)}px`,
      "--font-size-title": `${22 * (size.currentOption.value || 1)}px`,
      "--font-size-section-title": `${18 * (size.currentOption.value || 1)}px`,
      "--line-height": `${spacing.currentOption.value || 100}%`,

      "--column-1": "30%",
      "--column-2": "70%",

      fontFamily: "var(--font-primary)",
      fontSize: "var(--font-size)",
      color: "var(--color-contrast)",
      lineHeight: "var(--line-height)",
    } as Record<string, CSSProperties>
  }), [])

  return (
    <div style={styles.template}>
      {head && <Head {...head} />}

      <div>
        {personalInformation && <PersonalInformation {...personalInformation} />}
        {links && <Links {...links as any} />}

        {Object.entries(otherSectionsData).map(([key, data]) => {
          const Section = templateSectionsMap[key as TemplateSectionName];
          
          if (!Section || !data) return null;

          if (Array.isArray(data)) {
            return data.map(data => (
              <Section key={data.id} {...data as any} />
            ))
          }

          return <Section key={data.id} {...data as any} />;
        })}
      </div>
    </div>
  );
})