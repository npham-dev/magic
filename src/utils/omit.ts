export function omit<T, K extends keyof T>(record: T, keys: K[]): Omit<T, K> {
  const shallow: T = { ...record };
  for (const key of keys) {
    delete shallow[key];
  }
  return shallow as Omit<T, K>;
}
