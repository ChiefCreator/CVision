"use client"

import { SystemTheme } from "@/types/theme/theme";
import { useEffect, useState } from "react";

export function useSystemTheme() {
	const getSystemTheme = () => {
    if (typeof window === "undefined") return "light";

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

	const [systemTheme, setSystemTheme] = useState<SystemTheme>("light");

	useEffect(() => {
    setSystemTheme(getSystemTheme());

    if (typeof window !== "undefined") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");

      const listener = () => setSystemTheme(getSystemTheme());

      media.addEventListener("change", listener);

      return () => media.removeEventListener("change", listener);
    }
  }, []);

	return systemTheme;
}
