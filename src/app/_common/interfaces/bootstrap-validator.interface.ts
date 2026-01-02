export interface IBootstrapValidator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(...args: any[]): Promise<void> | void;
}
