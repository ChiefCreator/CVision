export default function isError(value: unknown): value is Error {
  return value instanceof Error;
}