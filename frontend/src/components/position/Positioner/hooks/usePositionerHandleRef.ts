import { useRef } from "react";
import { PositionerHandle } from "../Positioner";

export function usePositionerHandleRef() {
  return useRef<PositionerHandle>(null);
}