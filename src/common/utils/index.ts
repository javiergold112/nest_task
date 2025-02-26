export function getNestedValue(obj: any, path: string) {
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    if (result.hasOwnProperty(key)) result = result[key];
    else
      return {
        wasValid: false,
        data: null,
      };
  }
  return { wasValid: true, data: result };
}
