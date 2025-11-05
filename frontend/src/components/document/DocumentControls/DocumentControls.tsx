"use client"

import IconButton from "@/components/button/IconButton/IconButton";
import { useDocumentContext } from "@/hooks/document/useDocumentContext";
import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./DocumentControls.module.scss";

export default function DocumentControls({ className }: BaseComponent) {
	const { pageIndex, pageCount, isPageIndexMin, isPageIndexMax, prevPage, nextPage } = useDocumentContext();

  return (
    <div className={clsx(styles.buttons, className)}>
      <IconButton
        className={clsx(styles.button)}
        iconClassName={clsx(styles.icon, isPageIndexMin && styles.iconDisabled)}
        Icon={ChevronLeft}
        disabled={isPageIndexMin}

        onClick={prevPage}
      />

      <div className={styles.pagesCount}>
        {`${pageIndex} / ${pageCount}`}
      </div>

      <IconButton
        className={clsx(styles.button)}
        iconClassName={clsx(styles.icon, isPageIndexMax && styles.iconDisabled)}
        Icon={ChevronRight}
        disabled={isPageIndexMax}

        onClick={nextPage}
      />
    </div>
  );
}
