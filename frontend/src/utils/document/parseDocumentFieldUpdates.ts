import { DocumentFieldUpdates, UpdateDocumentDto } from "@/types/document/update";

export function parseDocumentFieldUpdates(updates: DocumentFieldUpdates) {
  const result: UpdateDocumentDto = {};

  for (const [path, value] of Object.entries(updates)) {
    const parts = path.split(".");
    let current: any = result;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      const match = part.match(/^(\w+)\[id=(.+?)\]$/);

      if (match) {
        const [, arrayKey, id] = match;

        current[arrayKey] ||= [];

        let item = current[arrayKey].find((el: any) => el.id === id);
        if (!item) {
          item = { id };
          current[arrayKey].push(item);
        }

        current = item;
      } else if (i === parts.length - 1) {
        current[part] = value;
      } else {
        current[part] ||= {};
        current = current[part];
      }
    }
  }

  return result;
}
