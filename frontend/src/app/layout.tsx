import { montserrat } from "@/assets/fonts/montserrat";

import Providers from "./providers";
import { SkeletonTheme } from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
import "@/assets/styles/_vars.scss";
import "@/assets/styles/_utils.scss";
import "@/assets/styles/_reset.scss";
import "@/assets/styles/_base.scss";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable}`} cz-shortcut-listen="true">
        <Providers>
          <SkeletonTheme baseColor="var(--color-neutral-secondary)" highlightColor="var(--color-neutral-secondary--light)">
            {children}
          </SkeletonTheme>
        </Providers>
      </body>
    </html>
  );
}
