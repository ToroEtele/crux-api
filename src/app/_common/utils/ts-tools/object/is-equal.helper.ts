import stringify from 'fast-json-stable-stringify';

export function isEqual(value1: unknown, value2: unknown): boolean {
  if (value1 instanceof Promise || value2 instanceof Promise) return false;
  return stringify(value1) === stringify(value2);
}
