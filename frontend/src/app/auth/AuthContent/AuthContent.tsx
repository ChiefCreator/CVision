"use client"

import { DocumentSlider, DocumentSliderProps } from "@/components/slider/DocumentSlider/DocumentSlider";

import styles from "./AuthContent.module.scss";

interface AuthContentProps {
	title: React.ReactNode | string;
	description: React.ReactNode | string;
	sliderColumns: DocumentSliderProps["columns"];
}

export function AuthContent({ title, description, sliderColumns }: AuthContentProps) {
	return (
		<div className={styles.content}>
			<div className={styles.info}>
				<h2 className={styles.title}>{title}</h2>

				<p className={styles.description}>{description}</p>
			</div>

			<div className={styles.sliderWrapper}>
				<div className={styles.overlay}>
					<div className={styles.overlayGradient}></div>
					<div className={styles.overlayGradient}></div>
				</div>

				<DocumentSlider
					className={styles.slider}
					columns={sliderColumns}
				/>
			</div>
		</div>
	);
}
