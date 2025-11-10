export interface IBootstrapValidator {
  validate(...args: any[]): Promise<void> | void;
}
