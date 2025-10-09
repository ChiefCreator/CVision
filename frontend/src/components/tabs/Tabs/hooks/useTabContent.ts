import { useTabsContext } from "./useTabsContext";

export function useTabContent(value: string) {
	const { value: activeValue } = useTabsContext();

	return { isActive: activeValue === value };
}