"use client";

import { ResolvedTheme, Theme } from "@/types/theme/theme";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSystemTheme } from './useSystemTheme';

type ThemeContextType = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  changeTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


interface ThemeProviderProps {
	children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemTheme = useSystemTheme();
  const [theme, setTheme] = useState<Theme>("system");

  const resolvedTheme = (theme === "system" ? systemTheme : theme) as ResolvedTheme;

	const changeTheme = (theme: Theme) => {
		setTheme(theme)

		localStorage.setItem("theme", theme);
	}

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) ?? "system";
    
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

		root.dataset.theme = resolvedTheme;
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const ctx = useContext(ThemeContext);

  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");

  return ctx;
};
