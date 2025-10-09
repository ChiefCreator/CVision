import { montserrat } from "@/assets/fonts/montserrat";
import Providers from "./providers/Providers";

import "@/assets/styles/index.scss";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem("theme");

                  if (!saved || saved === "system") {
                    saved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                  }
                  
                  document.documentElement.dataset.theme = saved;
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      
      <body className={`${montserrat.variable}`} cz-shortcut-listen="true">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}