export type GetFieldType<Obj, Path> = Path extends `${infer Left}.${infer Right}`
  ? Left extends keyof Obj
    ? Extract<Obj[Left], undefined> | GetFieldType<Exclude<Obj[Left], undefined>, Right>
    : undefined
  : Path extends keyof Obj
  ? Obj[Path]
  : undefined;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @example
 * // returns 3
 * get({ a: [{ b: { c: 3 } }] }, "a[0].b.c")
 */
export function get<TData, TPath extends string>(object: TData, path: TPath): GetFieldType<TData, TPath> | undefined {
  return <GetFieldType<TData, TPath>>(path
    .replace(/\[(\d+)]/g, '.$1')
    .split('.')
    .filter(Boolean)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .every((step: number | string) => (object = (<any>object)?.[step]) !== undefined)
    ? object
    : undefined);
}
