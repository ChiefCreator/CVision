import { PT_Serif } from "next/font/google";

export const pt_serif = PT_Serif({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-title",
});