import cloneDeep from 'lodash.clonedeep';
import lodashSet from 'lodash.set';

export function set<T extends object>(obj: T, path: string, value: any): T {
  const clone = cloneDeep(obj);
  const parts = path.split('.').filter(Boolean);

  let current: any = clone;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    const match = part.match(/^(\w+)\[(\w+)=(.+)\]$/);

    if (match) {
      const [, arrayKey, filterKey, filterValue] = match;
      const arr = current[arrayKey];
      if (!Array.isArray(arr)) return clone;

      const index = arr.findIndex((item: any) => String(item[filterKey]) === filterValue);
      if (index === -1) return clone;

      if (i === parts.length - 1) {
        arr[index] = value;
      } else if (i === parts.length - 2) {
        const nextKey = parts[i + 1];
        lodashSet(arr[index], nextKey, value);
        break;
      } else {
        current = arr[index];
      }
    } else if (i === parts.length - 1) {
      current[part] = value;
    } else {
      current = current[part];
      if (current == null) return clone;
    }
  }

  return clone;
}
