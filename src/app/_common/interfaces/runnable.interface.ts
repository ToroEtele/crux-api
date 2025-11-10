export interface IRunResults {
  message: string;
}
export interface IRunnable {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  run(): Promise<IRunResults | void>;
}
