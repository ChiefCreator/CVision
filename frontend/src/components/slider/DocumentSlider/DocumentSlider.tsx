"use client";

import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import Column from "./Column/Column";
import styles from "./DocumentSlider.module.scss";

export type Direction = "up" | "down";

export interface DocumentSliderProps extends BaseComponent {
	columns: {
		imageUrls: string[];
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
          imageUrls={col.imageUrls}
          direction={col.direction}
          speed={col.speed ?? 1}
        />
      ))}
    </div>
	);
}
