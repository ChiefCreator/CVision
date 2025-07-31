"use client"

import React from "react";
import type { TemplateRendererProps } from "../TemplateRenderer/TemplateRenderer";

import PreviewDocument from "./PreviewDocument";
import PrintDocument from "./PrintDocument";

interface BaseDocumentProps {
  className?: string;
  template: TemplateRendererProps;
}
export interface PrintDocumentProps extends BaseDocumentProps {
  performance: "print";
}
export interface PreviewDocumentProps extends BaseDocumentProps {
  performance: "preview";
}
type DocumentProps = PreviewDocumentProps | PrintDocumentProps;

export default React.memo(function Document(props: DocumentProps) {
  const performance = props.performance;

  const getDocument = () => {
    switch(performance) {
      case "preview": 
        return <PreviewDocument {...props} />
      case "print":
        return <PrintDocument {...props} />
    }
  }

  return getDocument();
})