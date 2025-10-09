"use client"

import { breakpoints } from "@/constants/breakpoints/breakpoints";
import { maxWidth } from "@/utils/media/maxWidth";
import { useMediaQuery } from "react-responsive";
import DrawerMonthPicker, { DrawerMonthPickerProps } from "../DrawerMonthPicker/DrawerMonthPicker";
import PopoverMonthPicker, { PopoverMonthPickerProps } from "../PopoverMonthPicker/PopoverMonthPicker";

type ResponsiveMenuProps = DrawerMonthPickerProps & PopoverMonthPickerProps;

export default function AdaptivePopoverMonthPicker(props: ResponsiveMenuProps) {
	const isMobile = useMediaQuery(maxWidth(breakpoints.tabletM));

  if (isMobile) {
    return <DrawerMonthPicker {...props} />;
  }

  return <PopoverMonthPicker {...props} />;
}
