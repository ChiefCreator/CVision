import React from "react";
import A4 from "../A4/A4";
import ResponsiveTemplate from "../ResponsiveTemplate/ResponsiveTemplate";
import TemplateRenderer from "../TemplateRenderer/TemplateRenderer";

import { PreviewDocumentProps } from "./Document";

export default React.memo(function PreviewDocument({ className, template }: PreviewDocumentProps) {

  return (
    <A4 className={className}>
      <ResponsiveTemplate>
        <TemplateRenderer {...template} />
      </ResponsiveTemplate>
    </A4>
  );
})