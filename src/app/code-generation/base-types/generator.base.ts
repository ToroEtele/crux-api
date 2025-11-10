import { IStorageSystem } from '@utils/storage-system/interfaces/storage-system.interface';
import { Constructable } from '@common/base-types/constructable.type';
import { IRunnable } from '@interfaces/runnable.interface';
import { BaseRenderer } from './renderer.base';

export abstract class BaseGenerator implements IRunnable {
  protected renderer: Constructable<BaseRenderer<unknown>>;
  protected storage: IStorageSystem;

  constructor(args: { storage: IStorageSystem; renderer: Constructable<BaseRenderer<unknown>>; directory: string }) {
    this.storage = args.storage.subDirectory(args.directory).touch();
    this.renderer = args.renderer;
  }

  public abstract run(): Promise<void>;
}
