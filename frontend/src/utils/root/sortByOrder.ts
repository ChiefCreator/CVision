export function sortByOrder(entities: any[]) {
  return entities.sort((a, b) => a.order - b.order);
}