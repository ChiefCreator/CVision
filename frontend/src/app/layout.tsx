import { montserrat } from "@/assets/fonts/montserrat";
import Providers from "./providers/Providers";

import "@/assets/styles/_base.scss";
import "@/assets/styles/_reset.scss";
import "@/assets/styles/_utils.scss";
import "@/assets/styles/_vars.scss";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable}`} cz-shortcut-listen="true">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}