export interface IBootstrapableService<T = void> {
  bootstrap(): Promise<T>;
  teardown(): Promise<void>;
}
