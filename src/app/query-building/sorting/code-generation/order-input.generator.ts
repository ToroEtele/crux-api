import { kebabCase } from 'lodash';

import { metadataManager, MetadataType } from '../../../_common/metadata/index';
import { IStorageSystem } from '../../../_common/utils/storage-system/interfaces/storage-system.interface';
import { BaseGenerator } from '../../../code-generation/base-types/generator.base';

import { OrderInputRenderer } from './renderers/order-input.renderer';

export class OrderInputGenerator extends BaseGenerator {
  constructor(storage: IStorageSystem) {
    super({ storage, renderer: OrderInputRenderer, directory: 'input-types' });
  }

  public async run(): Promise<void> {
    await Promise.all(
      metadataManager.getClassesWithMetadataType(MetadataType.FieldSortable).map(async (klass) => {
        const fileName = `${kebabCase(klass.name)}-order.input-type.ts`;
        // eslint-disable-next-line new-cap
        this.storage.write(fileName, await new this.renderer(klass).render());
      })
    );
  }
}
