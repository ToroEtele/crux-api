import fs from 'node:fs';
import { join as pathJoin } from 'node:path';
import { promisify } from 'util';

import { IStorageSystem } from '../../interfaces/storage-system.interface';

export class FileSystemService implements IStorageSystem {
  private readonly fileSystem = fs;

  constructor(public location: string) {}

  public touch(): FileSystemService {
    if (!this.exists()) {
      this.fileSystem.mkdirSync(this.location);
    }
    return this;
  }

  public exists(): boolean {
    return this.fileSystem.existsSync(this.location);
  }

  public write(objectName: string, contents: string): void {
    const objectLocation = this.objectLocation(objectName);
    this.fileSystem.writeFileSync(objectLocation, contents, {
      encoding: 'utf8'
    });
  }

  public async read(objectName: string): Promise<string> {
    const objectLocation = this.objectLocation(objectName);
    const readFile = promisify(this.fileSystem.readFile);
    return await readFile(objectLocation, {
      encoding: 'utf8'
    });
  }

  private objectLocation(objectName: string): string {
    return pathJoin(this.location, objectName);
  }

  public list(pattern: RegExp): string[] {
    return this.listAll().filter((fileName) => !!fileName.match(pattern));
  }

  public listAll(): string[] {
    return this.fileSystem.readdirSync(this.location);
  }

  public subDirectory(directory: string): FileSystemService {
    return new FileSystemService(pathJoin(this.location, directory));
  }
}
