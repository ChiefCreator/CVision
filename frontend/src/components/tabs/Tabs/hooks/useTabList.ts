import { useEffect, useRef } from "react";
import { useTabsContext } from "./useTabsContext";

export function useTabList() {
	const { value, getTriggers } = useTabsContext();

	const listRef = useRef<HTMLDivElement | null>(null);

	const triggers = getTriggers();

	useEffect(() => {
		const list = listRef.current;
		const activeTrigger = triggers.find(el => el.id === `trigger-${value}`);

		if (list && activeTrigger) {
			const listRect = list.getBoundingClientRect();
			const activeTriggerRect = activeTrigger.getBoundingClientRect();

			const style = window.getComputedStyle(list);
			const paddingLeft = parseFloat(style.paddingLeft) || 0;

			list.scrollTo({
				left: list.scrollLeft + (activeTriggerRect.left - listRect.left - paddingLeft),
				behavior: "smooth",
			});
		}
	}, [triggers])

	return { ref: listRef };
}