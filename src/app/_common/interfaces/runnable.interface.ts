export interface IRunResults {
  message: string;
}
export interface IRunnable {
   
  run(): Promise<IRunResults | void>;
}
