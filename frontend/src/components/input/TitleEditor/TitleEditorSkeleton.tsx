import React from "react";

import Skeleton from "react-loading-skeleton";

import type { BaseComponent } from "@/types/rootTypes";

import clsx from 'clsx';
import styles from "./TitleEditor.module.scss"

export default function TitleEditorSkeleton({ className }: BaseComponent) {
  return (
    <div className={clsx(styles.editor, className)} style={{ display: "block", width: "100%" }}>
      <Skeleton />
    </div>
  );
}
