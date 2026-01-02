import { IStorageSystem } from '../../../../_common/utils/storage-system/interfaces/storage-system.interface';
import { BaseGenerator } from '../../../../code-generation/base-types/generator.base';

import { AllEntitiesRenderer } from './renderers/all-entities.renderer';

export class AllEntitiesGenerator extends BaseGenerator {
  constructor(storage: IStorageSystem) {
    super({ storage, renderer: AllEntitiesRenderer, directory: 'constants' });
  }

  public async run(): Promise<void> {
     
    this.storage.write('entities-list.constant.ts', await new this.renderer().render());
  }
}
