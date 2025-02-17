export function replaceSpaces(text, replacement = "_") {
  return text.split(" ").join(replacement);
}
