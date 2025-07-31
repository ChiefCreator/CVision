export function sortByOrder(subsections: any[]) {
  return subsections.sort((a, b) => a.order - b.order);
}