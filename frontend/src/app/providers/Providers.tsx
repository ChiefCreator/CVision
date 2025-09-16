"use client"

import { SkeletonTheme } from "react-loading-skeleton";
import { ToastProvider } from "./components/ToastProvider";

import "react-loading-skeleton/dist/skeleton.css";
import QueryClientProvider from "./components/QueryClientProvider";

interface ProvidersProps {
	children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
	return (
		<QueryClientProvider>
			<SkeletonTheme
				baseColor="var(--color-neutral-secondary)"
				highlightColor="var(--color-neutral-secondary--light)"
			>
				<ToastProvider>
					{children}
				</ToastProvider>
			</SkeletonTheme>
		</QueryClientProvider>
	);
}
