import { useGeneratePdf } from "@/api/document/hooks/useGeneratePdf";
import { useEffect, useRef, useState } from "react";

import ClassicTemplate from "@/components/templates/resumeTemplates/ClassicTemplate/ClassicTemplate";
import { Document } from "@/types/document/document";
import { renderToHtml } from "@/utils/template/renderToHtml";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

interface UseRenderPdfProps {
  data: Document | undefined;
  pageIndex?: number;
  onSetPageCount?: (count: number) => void;
}

export function useRenderPdf({ data, pageIndex = 0, onSetPageCount }: UseRenderPdfProps) {
  const { mutate: generatePdf, data: pdfData } = useGeneratePdf();
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!data) return;

    setStatus("loading");

    const html = renderToHtml(<ClassicTemplate data={data as any} />);

    generatePdf(html);
  }, [data]);

  useEffect(() => {
    let isCanceled = false;

    async function loadDocument() {
      if (!pdfData) return;

      try {
        const pdf = await pdfjsLib.getDocument(pdfData.arrayBuffer).promise;

        if (isCanceled) return pdf.destroy();

        setPdf(pdf);
        onSetPageCount?.(pdf.numPages);
      } catch (error) {
        console.error("Error loading PDF:", error);
        setStatus("error");
      }
    }

    loadDocument();

    return () => {
      isCanceled = true;
      setPdf(null);
    };
  }, [pdfData?.arrayBuffer]);

  useEffect(() => {
    let isCanceled = false;

    async function renderPage() {
      if (!pdf) return;

      setStatus("loading");

      try {
        const page = await pdf.getPage(pageIndex);
        if (isCanceled) return;

        const viewport = page.getViewport({ scale: 1 });
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) return;

        canvas.width = Math.round(viewport.width);
        canvas.height = Math.round(viewport.height);

        context.clearRect(0, 0, canvas.width, canvas.height);

        await page.render({ canvasContext: context, viewport }).promise;
        setStatus("idle");
      } catch (error) {
        console.error("Render error:", error);
        setStatus("error");
      }
    }

    renderPage();

    return () => { isCanceled = true; };
  }, [pdf, pageIndex]);

  return { canvasRef, status, pdf, generate: generatePdf };
}
