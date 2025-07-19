import React from "react";
import { SECTION_ADDITIONAL_NAMES } from "@/constants/sectionNames";

import styles from "./AddSection.module.scss";
import Skeleton from "react-loading-skeleton";
import AddSectionItemSkeleton from "./AddSectionItem/AddSectionItemSkeleton";

export default function AddSectionSkeleton() {
  return (
    <section className={styles.section}>
      <header className={styles.head}>
        <h2 className={styles.title}><Skeleton /></h2>
      </header>

      <ul className={styles.list}>
        {SECTION_ADDITIONAL_NAMES.map(sectionName => <li key={sectionName}><AddSectionItemSkeleton /></li>)}
      </ul>
    </section>
  );
}