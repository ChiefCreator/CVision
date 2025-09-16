export function splitMessage(errorMessage: string) {
  const firstDotIndex = errorMessage.indexOf(".");

  if (firstDotIndex === -1) {
    return { title: errorMessage.trim(), description: "" };
  }

  const title = errorMessage.slice(0, firstDotIndex).trim();
  const description = errorMessage.slice(firstDotIndex + 1).trim();

  return { title, description };
}
