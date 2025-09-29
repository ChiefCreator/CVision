"use client"

import AbsoluteSidebar from "./AbsoluteSidebar";
import StaticSidebar from "./StaticSidebar";

import { PositionerProps } from "@/components/position/Positioner/Positioner";
import { BaseComponent } from "@/types/root";

type BaseSidebarProps = BaseComponent;

export interface StaticSidebarProps extends BaseSidebarProps {
  type: "static";
}

export interface AbsoluteSidebarProps extends BaseSidebarProps {
  type: "absolute";
  popoverClassName?: string;
  positioner?: PositionerProps;
}

type SidebarContentProps = StaticSidebarProps | AbsoluteSidebarProps;

export default function Sidebar(props: SidebarContentProps) {
  
  switch(props.type) {
    case "static": return <StaticSidebar {...props} />;
    case "absolute": return <AbsoluteSidebar {...props} />;
  }
}