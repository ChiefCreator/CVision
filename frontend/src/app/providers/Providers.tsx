"use client"

import { SkeletonTheme } from "react-loading-skeleton";
import { ToastProvider } from "./components/ToastProvider";

import { ThemeProvider } from "@/hooks/theme/useTheme";
import "react-loading-skeleton/dist/skeleton.css";
import QueryClientProvider from "./components/QueryClientProvider";

interface ProvidersProps {
	children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
	return (
		<ThemeProvider>
			<QueryClientProvider>
				<SkeletonTheme
					baseColor="var(--color-neutral--dark)"
					highlightColor="var(--color-neutral--soft-dark)"
				>
					<ToastProvider>
						{children}
					</ToastProvider>
				</SkeletonTheme>
			</QueryClientProvider>
		</ThemeProvider>
	);
}
