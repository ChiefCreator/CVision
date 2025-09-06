"use client";

import { TemplateRendererProps } from "@/components/document/TemplateRenderer/TemplateRenderer";
import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import Column from "./Column/Column";
import styles from "./DocumentSlider.module.scss";

export type Direction = "up" | "down";

export interface DocumentSliderProps extends BaseComponent {
	columns: {
		data: TemplateRendererProps[];
		direction: Direction;
    speed?: number;
	}[];
}

export function DocumentSlider({ className, columns }: DocumentSliderProps) {
	return (
		<div className={clsx(styles.slider, className)}>
      {columns.map((col, i) => (
        <Column
          key={i}
          data={col.data}
          direction={col.direction}
          speed={col.speed ?? 1}
        />
      ))}
    </div>
	);
}
