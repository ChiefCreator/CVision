import lodashSet from 'lodash.set';

export function updateObjValueByField<T extends object>(obj: T, path: string, value: any): T {
  if (!obj) return obj;
  
  const parts = path.split(".").filter(Boolean);

  const clone: any = Array.isArray(obj) ? [...obj] : { ...obj };
  let current: any = clone;
  let original: any = obj;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const match = part.match(/^(\w+)\[(\w+)=(.+)\]$/);

    if (match) {
      const [, arrayKey, filterKey, filterValue] = match;
      const arr = original?.[arrayKey];
      if (!Array.isArray(arr)) return clone;

      const index = arr.findIndex((item: any) => String(item[filterKey]) === filterValue);
      if (index === -1) return clone;

      current[arrayKey] = [...arr];
      const target = { ...arr[index] };
      current[arrayKey][index] = target;

      if (i === parts.length - 1) {
        current[arrayKey][index] = value;
      } else if (i === parts.length - 2) {
        const nextKey = parts[i + 1];
        lodashSet(target, nextKey, value);
        break;
      } else {
        current = target;
        original = arr[index];
      }
    } else {
      if (i === parts.length - 1) {
        current[part] = value;
      } else {
        const nextOriginal = original?.[part];
        const nextClone = Array.isArray(nextOriginal)
          ? [...nextOriginal]
          : nextOriginal && typeof nextOriginal === "object"
          ? { ...nextOriginal }
          : {};
        current[part] = nextClone;

        current = nextClone;
        original = nextOriginal;
      }
    }
  }

  return clone;
}