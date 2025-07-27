import React from "react";
import type { TemplateRendererProps } from "../TemplateRenderer/TemplateRenderer";

import PreviewDocument from "./PreviewDocument";
import PrintDocument from "./PrintDocument";

interface BaseDocumentProps {
  className?: string;
  template: TemplateRendererProps;
}
export interface PrintDocumentProps extends BaseDocumentProps {
  type: "print";
  printRef?: React.RefObject<HTMLDivElement | null>;
}
export interface PreviewDocumentProps extends BaseDocumentProps {
  type: "preview";
}
type DocumentProps = PreviewDocumentProps | PrintDocumentProps;

export default React.memo(function Document(props: DocumentProps) {
  const type = props.type;

  const getDocument = () => {
    switch(type) {
      case "preview": 
        return <PreviewDocument {...props} />
      case "print":
        return <PrintDocument {...props} />
    }
  }

  return getDocument();
})