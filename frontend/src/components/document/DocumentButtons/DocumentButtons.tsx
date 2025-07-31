"use client"

import { ChevronLeft, ChevronRight } from "lucide-react";
import IconButton from "@/components/button/IconButton/IconButton";

import styles from "./DocumentButtons.module.scss";
import { useDocumentPage } from "../../../hooks/document/useDocumentPage";
import clsx from "clsx";
import { BaseComponent } from "@/types/root";

interface DocumentButtonsProps extends BaseComponent {};

export default function DocumentButtons({ className }: DocumentButtonsProps) {
  const { pageNumber, pagesCount, isPageIndexMin, isPageIndexMax, prevPage, nextPage } = useDocumentPage();

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
        {`${pageNumber} / ${pagesCount}`}
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