import { IteratorUtil } from '../_common/utils/iterator.util';

import type { IBootstrapValidator } from '../_common/interfaces/bootstrap-validator.interface';
import type { IBootstrapableService } from '../_common/interfaces/bootstrapable.interface';

interface IBootstrapServiceOptions {
  validators: IBootstrapValidator[];
}

export class BootstrapService {
  constructor(public bootstrapables: IBootstrapableService[], private readonly options: IBootstrapServiceOptions = { validators: [] }) {}

  public async bootstrap(): Promise<void> {
    await this.validate();
    for await (const bootstrapable of IteratorUtil.createAsyncIterable(this.bootstrapables)) {
      await bootstrapable.bootstrap();
    }
  }

  public async validate(): Promise<void> {
    for await (const validator of IteratorUtil.createAsyncIterable(this.options.validators)) {
      await validator.validate();
    }
  }

  public async teardown(): Promise<void> {
    for await (const bootstrapable of IteratorUtil.createAsyncIterable(this.bootstrapables)) {
      await bootstrapable.teardown();
    }
  }
}
