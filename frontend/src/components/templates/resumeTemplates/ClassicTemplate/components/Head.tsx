import { join } from "@/utils/string/join";

import { TemplateData } from "../types/templateData";

import { checkIsSubsectionDataEmpty } from "@/utils/template/checkIsAllSubsectionsDataEmpty";

// .address-and-contact {
//   text-align: center;
// }

export default function Head({ data }: TemplateData["head"]) {
  if (checkIsSubsectionDataEmpty(data)) return null;
  
  const { fullName, jobTitle, address, postalCode, phone, city, country, email } = data;

  return (
    <header style={{ paddingBottom: "20px" }}>
      <h1
        style={{
          textAlign: "center",
          fontfamily: "var(--font-title)",
          fontSize: "var(--font-size-title)",
          fontWeight: 700,
          marginBottom: "15px",
        } as React.CSSProperties}
      >
        {join([fullName, jobTitle])}
      </h1>

      <p style={{ textAlign: "center" }}>
        {join([
          address, city, postalCode,
          country, phone, email
        ])}
      </p>
    </header>
  );
}