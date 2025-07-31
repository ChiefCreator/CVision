"use client"

import React, { useEffect, useRef } from "react";
import { useDocumentPage } from "../../../hooks/document/useDocumentPage";

import { DOCUMENT_SIZE } from "@/constants/root/documentSize";

import type { Resume } from "@/types/resume/resume";
import type { ResumeTemplateConfig, ResumeTemplateName } from "@/types/resume/template";
import type { DocumentPerformance } from "@/types/document/document";
import clsx from "clsx";

interface TemplatePagesProps {
  resume: Resume;
  template: ResumeTemplateConfig<ResumeTemplateName>;
  performance?: DocumentPerformance;
}

export default function TemplatePages({ resume, template, performance }: TemplatePagesProps) {
  const { pages, pageIndex, setPages } = useDocumentPage();

  const { Component, transformResume, columns } = template;
  const data = transformResume(resume);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const createPages = () => {
    if (!pages?.[pageIndex]) return null;

    switch(performance) {
      case "preview":
        return <Component data={pages[pageIndex]} />;
      case "print": 
        return pages.map((page, i) => (
          <div className={clsx(i !== pages.length - 1 && "pdf-page")} key={i}><Component data={page} /></div>
        ))
    }
  }

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const pageHeight = DOCUMENT_SIZE.height;
    let currentPageHeight = 0;

    const sections: HTMLElement[] = Array.from(container.querySelectorAll(`[data-section-name]`));

    const columnsPageData = columns?.reduce((acc: any[][], columnSectionNames) => {
      const columnPageData: any[][] = [];
      let columnCurrentPageData: any[] = []; 

      const columnSections = sections.filter(s => columnSectionNames.includes(s.dataset.sectionName as any));

      columnSections.forEach(section => {
        const name = section.dataset.sectionName;
        const id = section.dataset.sectionId;
        const height = section.offsetHeight;

        if (currentPageHeight + height > pageHeight) {
          columnPageData.push([...columnCurrentPageData]);

          const dataItem = data.find((s: any) => (s.name === name && s.data.id === id))
          if (dataItem) columnCurrentPageData = [dataItem];

          currentPageHeight = height;

          return;
        }

        const dataItem = data.find((s: any) => (s.name === name && s.data.id === id));
        columnCurrentPageData.push(dataItem);
        currentPageHeight += height;
      });

      columnPageData.push(columnCurrentPageData);
      acc.push(columnPageData);

      return acc;
    }, []);

    const mergeCByIndex = (arr: any[][][]) => {
      const result: any[][] = [];
    
      arr.forEach(bArray => {
        bArray.forEach((cArray, index) => {
          if (!result[index]) result[index] = [];
          result[index].push(...cArray);
        });
      });
    
      return result;
    }

    if (columnsPageData) {
      const resultPages = mergeCByIndex(columnsPageData);

      setPages(resultPages);
    }
  }, [resume]);

  return (
    <>
      <div ref={containerRef} style={{ width: DOCUMENT_SIZE.width, height: DOCUMENT_SIZE.height, position: "absolute", visibility: "hidden", pointerEvents: "none", zIndex: -9999 }}>
        <Component data={data} />
      </div>

      {createPages()}
    </>
  );
}