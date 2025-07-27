import TemplateRenderer from "../TemplateRenderer/TemplateRenderer";

import type { PrintDocumentProps } from "./Document";

export default function PrintDocument({ className, template, printRef }: PrintDocumentProps) {

  return (
    <div ref={printRef}>
      <TemplateRenderer {...template} />
    </div>
  );
}