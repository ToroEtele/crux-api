import { isUndefined } from './is-undefined.helper';

export function isNull(value: unknown): value is null | undefined {
  return value === null || isUndefined(value);
}
