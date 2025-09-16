import { MessageResponse } from "@/types/api/response";

export function hasMessage(value: unknown): value is MessageResponse {
  return (
    typeof value === 'object' && value !== null && "message" in value && typeof (value as any).message === "string"
  );
}