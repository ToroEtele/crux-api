export interface IStorageSystem {
  touch(): IStorageSystem;
  exists(): boolean;
  write(objectName: string, contents: string): void;
  read(objectName: string): Promise<string>;
  subDirectory(directory: string): IStorageSystem;
  list(pattern: RegExp): string[];
}
