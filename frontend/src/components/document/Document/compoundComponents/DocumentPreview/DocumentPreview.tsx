"use client";

import { useEffect, useRef, useState } from "react";
import { useDocumentContext } from "../../hooks/useDocumentContext";

import ClassicTemplate from "@/components/templates/resumeTemplates/ClassicTemplate/ClassicTemplate";

import { renderToHtml } from "@/utils/template/renderToHtml";

import { BaseComponent } from "@/types/root";

import clsx from "clsx";
import styles from "./DocumentPreview.module.scss";

import { useGeneratePdf } from "@/api/document/hooks/useGeneratePdf";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

interface DocumentPreviewProps extends BaseComponent {};

export default function DocumentPreview({ className }: DocumentPreviewProps) {
	const { data, pageIndex, status, setPageCount, setStatus } = useDocumentContext();
	const { mutate: generatePdf, data: pdfData } = useGeneratePdf();

	const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		generatePdf(renderToHtml(<ClassicTemplate data={data as any} />));
	}, [data])

  useEffect(() => {
    let isCanceled = false;

    setStatus("loading");

    async function loadDocument() {
      try {
				if (!pdfData?.url) return;
				
        const doc = await pdfjsLib.getDocument(pdfData.arrayBuffer).promise;

        if (isCanceled) return doc.destroy();

        setPdf(doc);
        setPageCount(doc.numPages);
      } catch (error: any) {
        console.error("Error loading PDF:", error);
        setStatus("error");
      }
    }

    loadDocument();

    return () => {
      isCanceled = true;

      setPdf(null);
    };
  }, [pdfData?.url]);

	useEffect(() => {
    let isCanceled = false;

    setStatus("loading");

    async function renderPage() {
      if (!pdf) return;

      try {
        const page = await pdf.getPage(pageIndex);
        
        if (isCanceled) return;

        const viewport = page.getViewport({ scale: 1 });

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) throw new Error("Canvas 2D context not available");

        canvas.width = Math.round(viewport.width);
        canvas.height = Math.round(viewport.height);

        const renderContext = {
          canvasContext: context,
          viewport: viewport.clone({ scale: 1 }),
        };

        context.clearRect(0, 0, canvas.width, canvas.height);

        await page.render(renderContext).promise;

        setStatus("idle");
      } catch (err) {
        console.error("Render error:", err);
        setStatus("error");
      }
    }

    renderPage();

    return () => {
      isCanceled = true;
    };
  }, [pdf, pageIndex]);

  return (
    <div className={clsx(styles.viewer, className)}>
      <canvas className={clsx(styles.canvas, status !== "idle" && styles.canvasHidden)} ref={canvasRef} />
		</div>
  );
};