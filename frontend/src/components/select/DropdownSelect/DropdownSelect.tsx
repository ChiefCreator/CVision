"use client";

import { createRef, useEffect, useRef } from "react";

import { useArrowNavigation } from "@/hooks/root/useArrowNavigation";
import { PopoverVariant } from "@/types/position/popoverVariant";
import { DataItem } from "@/types/select/select";
import clsx from "clsx";
import styles from "./DropdownSelect.module.scss";

export interface DropdownSelectProps {
	variant?: PopoverVariant;
	selectedValue?: string;
	data: DataItem[];

	onChange: (selectedValue: string) => void;
}

export default function DropdownSelect({
	variant = "primary",
	selectedValue = "",
	data,
	onChange,
}: DropdownSelectProps) {
	const { register, focusNext, focusPrev, focusParent, getFocusedIndex } = useArrowNavigation();
	const focusIndex = getFocusedIndex(1);
	const optionRefs = useRef<React.RefObject<HTMLButtonElement | null>[]>(data.map(() => createRef()));

	const isSelected = (value: string) => {
		return value === selectedValue;
	};

	const handleChange = (value: string) => {
		onChange(value);
	};
	
	const handleKeyDown = (e: React.KeyboardEvent) => {
		e.stopPropagation();

		if (["ArrowDown", "ArrowUp", "Enter", " ", "ArrowLeft", "Escape"].includes(e.key)) e.preventDefault();

		switch (e.key) {
			case "ArrowDown":
				focusNext(1);

				break;
			case "ArrowUp":
				focusPrev(1);

				break;
			case "Enter": case " ": {
        if (focusIndex >= 0 && focusIndex < data.length) {
          handleChange(data[focusIndex].value);
        }

        break;
      }
			case "ArrowLeft":
      case "Escape":
        focusParent(1);
				close();

        break;
		}
	};

	useEffect(() => {
		register(1, optionRefs);
	}, []);

	useEffect(() => {
		if (focusIndex !== null && optionRefs.current[focusIndex]) {
			optionRefs.current[focusIndex].current!.scrollIntoView({ block: "nearest" });
		}
	}, [focusIndex]);

	return (
		<div className={styles.dropdown} data-variant={variant}>
			<div className={styles.container}>
				<div className={styles.content}>
					<ul className={styles.list}>
						{data.map(({ value, label }, i) => (
							<li key={value} role="option" aria-selected={isSelected(value)}>
								<button
									className={clsx(styles.option, isSelected(value) && styles.optionActive)}
									type="button"
									ref={optionRefs.current[i]}

									onClick={() => handleChange(value)}
									onKeyDown={handleKeyDown}
								>
									{label}
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
