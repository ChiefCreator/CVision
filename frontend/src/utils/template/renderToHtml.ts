import React from "react";
import ReactDOMServer from "react-dom/server";

interface renderToHtmlOptions {
  styles?: string[];
}

export function renderToHtml(
  content: React.ReactElement,
  options: renderToHtmlOptions = {}
): string {
  const bodyHtml = ReactDOMServer.renderToStaticMarkup(content);
  const allStyles = options.styles?.join("\n") ?? "";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Document Preview</title>
        <style>
          ${allStyles}
        </style>
      </head>
      <body>
        ${bodyHtml}
      </body>
    </html>
  `;
}
