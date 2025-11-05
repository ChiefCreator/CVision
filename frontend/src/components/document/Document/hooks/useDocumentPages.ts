import { useCallback, useState } from "react";

export function useDocumentPages() {
	const [pageCount, setPageCount] = useState(0);
	const [pageIndex, setPageIndex] = useState(1);

	const isPageIndexMin = pageIndex === 1;
	const isPageIndexMax = pageIndex === pageCount;
	
	const openPage = useCallback((index: number) => {
		if (index >= 1 && index <= pageCount) {
			setPageIndex(index);
		}
	}, [pageCount, setPageIndex]);
	
	const nextPage = useCallback(() => {
		if (pageIndex + 1 <= pageCount) {
			openPage(pageIndex + 1);
		}
	}, [pageIndex, pageCount, openPage])

	const prevPage = useCallback(() => {
		if (pageIndex - 1 >= 1) {
			openPage(pageIndex - 1);
		}
	}, [pageIndex, openPage]);

	const setPageCountFunc = useCallback((count: number) => {
		setPageCount(count);
	}, [setPageCount])

	return {
		pageCount,
		pageIndex,
		isPageIndexMin,
		isPageIndexMax,
		openPage,
		nextPage,
		prevPage,
		setPageCount: setPageCountFunc,
	};
}