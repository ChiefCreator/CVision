"use client";

import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
	children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
	return (
		<>
      {children}

			<ToastContainer stacked />
		</>
	);
}
