import { useState } from "react";

export function useDocumentPages() {
	const [pageCount, setPageCount] = useState(0);
	const [pageIndex, setPageIndex] = useState(1);
	
	const openPage = (index: number) => {
		if (index >= 1 && index <= pageCount) {
			setPageIndex(index);
		}
	};
	
	const nextPage = () => {
		if (pageIndex + 1 <= pageCount) {
			openPage(pageIndex + 1);
		}
	}

	const prevPage = () => {
		if (pageIndex - 1 >= 1) {
			openPage(pageIndex - 1);
		}
	};

	const setPageCountFunc = (count: number) => {
		setPageCount(count);
	}

	return {
		pageCount,
		pageIndex,
		openPage,
		nextPage,
		prevPage,
		setPageCount: setPageCountFunc,
	};
}