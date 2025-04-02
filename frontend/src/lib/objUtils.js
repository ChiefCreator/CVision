export function filterObjectByArrayOfKeys(obj, keys) {
  if (!Array.isArray(keys)) return {};
  
  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}
