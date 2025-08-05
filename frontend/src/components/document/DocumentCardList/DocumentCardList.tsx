"use client"

import DocumentCard from "../DocumentCard/DocumentCard";

import type { Document } from "@/types/document/document";

import styles from "./DocumentCardList.module.scss";

interface DocumentCardListProps {
  data: Document[];
}

export default function DocumentCardList({ data }: DocumentCardListProps) {
  return (
    <ul className={styles.list}>
      {data.map(({ type, data }) => (
        <li key={data.id} className={styles.item}>
          <DocumentCard type={type} data={data} />
        </li>
      ))}
    </ul>
  );
}