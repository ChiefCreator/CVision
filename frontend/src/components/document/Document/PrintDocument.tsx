import TemplateRenderer from "../TemplateRenderer/TemplateRenderer";

import type { PrintDocumentProps } from "./Document";

export default function PrintDocument({ template, performance }: PrintDocumentProps) {

  return <TemplateRenderer {...template} performance={performance} />
}