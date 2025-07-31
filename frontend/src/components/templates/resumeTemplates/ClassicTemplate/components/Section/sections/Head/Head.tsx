import { join } from "@/utils/string/join";

import { ClassicTemplateSectionsMap } from "../../../../types/section";

import styles from "./Head.module.scss";

interface HeadProps {
  data: ClassicTemplateSectionsMap["head"];
}

export default function Head({ data }: HeadProps) {
  const { id, fullName, jobTitle, address, postalCode, phone, city, country, email } = data;

  return (
    <header className={styles.header} data-section-id={id} data-section-name="head">
      <h1 className={styles.title}>{join([fullName, jobTitle])}</h1>

      <p className={styles.addressAndContact}>
        {join([
          address, city, postalCode,
          country, phone, email
        ])}
      </p>
    </header>
  );
}