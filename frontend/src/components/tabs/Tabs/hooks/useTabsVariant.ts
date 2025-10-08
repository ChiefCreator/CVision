import { TabsVariant } from "../types/tabsVariant";
import { useTabsContext } from "./useTabsContext";

export function useTabsVariant(variant?: TabsVariant) {
	const { variant: mainVariant } = useTabsContext();

	return variant ?? mainVariant;
}