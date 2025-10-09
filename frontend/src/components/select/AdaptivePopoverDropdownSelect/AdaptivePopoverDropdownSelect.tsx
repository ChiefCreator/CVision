"use client"

import { breakpoints } from "@/constants/breakpoints/breakpoints";
import { maxWidth } from "@/utils/media/maxWidth";
import { useMediaQuery } from "react-responsive";
import DrawerDropdownSelect, { DrawerDropdownSelectProps } from "../DrawerDropdownSelect/DrawerDropdownSelect";
import PopoverDropdownSelect, { PopoverDropdownSelectProps } from "../PopoverDropdownSelect/PopoverDropdownSelect";

export type AdaptivePopoverDropdownSelectProps = DrawerDropdownSelectProps & PopoverDropdownSelectProps;

export default function AdaptivePopoverDropdownSelect(props: AdaptivePopoverDropdownSelectProps) {
		const isMobile = useMediaQuery(maxWidth(breakpoints.tabletM));

  if (isMobile) {
    return <DrawerDropdownSelect {...props} />;
  }

  return <PopoverDropdownSelect {...props} />;
}
