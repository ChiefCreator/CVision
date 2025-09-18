import { SystemTheme } from "@/types/theme/theme";
import { useEffect, useState } from "react";

export function useSystemTheme() {
	const getSystemTheme = () => {
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	}

	const [systemTheme, setSystemTheme] = useState<SystemTheme>(getSystemTheme);

	useEffect(() => {
		const media = window.matchMedia("(prefers-color-scheme: dark)");

		const handler = () => setSystemTheme(getSystemTheme());

		media.addEventListener("change", handler);

		return () => media.removeEventListener("change", handler);
	}, []);

	return systemTheme;
}
