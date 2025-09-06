
"use client";

import { useEffect, useRef } from "react";
import { Direction } from "../DocumentSlider";

import Image from "next/image";
import styles from "./Column.module.scss";

type ColumnProps = {
	imageUrls: string[];
	speed: number;
	direction: Direction;
};

export default function Column({ imageUrls, speed, direction }: ColumnProps) {
	const block1Ref = useRef<HTMLDivElement>(null);
	const block2Ref = useRef<HTMLDivElement>(null);

  const animationFrameRef = useRef<number>(0);

  const animate = (animationFrame: number, pos1: number, pos2: number, b1: HTMLDivElement, b2: HTMLDivElement, blockGap: number) => {
    const delta = direction === "up" ? -speed : speed;

		pos1 += delta;
		pos2 += delta;

		const height = b1.scrollHeight;

		if (direction === "up" && pos1 <= -height) pos1 = pos2 + height + blockGap;
		if (direction === "up" && pos2 <= -height) pos2 = pos1 + height + blockGap;

		if (direction === "down" && pos1 >= height) pos1 = pos2 - height - blockGap;
		if (direction === "down" && pos2 >= height) pos2 = pos1 - height - blockGap;

		b1.style.transform = `translateY(${pos1}px)`;
		b2.style.transform = `translateY(${pos2}px)`;

    const step = () => animate(animationFrame, pos1, pos2, b1, b2, blockGap);

	  animationFrame = requestAnimationFrame(step);
  }

	useEffect(() => {
		const b1 = block1Ref.current;
		const b2 = block2Ref.current;

		if (!b1 || !b2) return;

    const blockGap = parseFloat(getComputedStyle(b1).gap);

		let pos1 = 0;
		let pos2 = direction === "up" ? b1.scrollHeight + blockGap : -b1.scrollHeight - blockGap;

		const step = () => animate(animationFrameRef.current, pos1, pos2, b1, b2, blockGap);

		animationFrameRef.current = requestAnimationFrame(step);
		return () => cancelAnimationFrame(animationFrameRef.current);
	}, [speed, direction]);
  useEffect(() => {
		const handleResize = () => {
		  const b1 = block1Ref.current;
		  const b2 = block2Ref.current;
      
		  if (!b1 || !b2) return;
      
      const blockGap = parseFloat(getComputedStyle(b1).gap);
      
		  let pos1 = 0;
		  let pos2 = direction === "up" ? b1.scrollHeight + blockGap : -b1.scrollHeight - blockGap;

      animate(animationFrameRef.current, pos1, pos2, b1, b2, blockGap);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [direction]);

	return (
		<div className={styles.column}>
			<div ref={block1Ref} className={styles.inner}>
				{imageUrls.map((url, i) => (
    			<Image
						className={styles.image}
						key={`b1-${i}`}
    			  src={url}
    			  alt="Example resume image"
						width={852}
						height={1204}
						loading="lazy"
    			/>
				))}
			</div>
      
			<div ref={block2Ref} className={styles.inner}>
				{imageUrls.map((url, i) => (
    			<Image
						className={styles.image}
						key={`b2-${i}`}
    			  src={url}
    			  alt="Example resume image"
    			  width={852}
						height={1204}
						loading="lazy"
    			/>
				))}
			</div>
		</div>
	);
}
