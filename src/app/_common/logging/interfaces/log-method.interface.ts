export interface ILogMethod {
  (msgOrObj: Error | Record<string, unknown> | string): void
  (msg: string, ...interpolationArgs: any[]): void
  (
    obj: Error | Record<string, unknown>,
    msg: string,
    ...interpolationArgs: any[]
  ): void
}
