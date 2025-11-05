"use client";

import { useDocumentContext } from "../../hooks/useDocumentContext";

import { BaseComponent } from "@/types/root";

import clsx from "clsx";
import styles from "./DocumentPreview.module.scss";
import DocumentPreviewSkeleton from "./DocumentPreviewSkeleton";

interface DocumentPreviewProps extends BaseComponent {};

export default function DocumentPreview({ className }: DocumentPreviewProps) {
	const { canvasRef, isGetLoading, isGetError } = useDocumentContext();

  if (isGetError) {
    return "Ошибка отображения документа";
  }

  if (isGetLoading) {
    return <DocumentPreviewSkeleton />;
  }

  return (
    <div className={clsx(styles.viewer, className)}>
      <canvas className={clsx(styles.canvas)} ref={canvasRef} />
		</div>
  );
};