import { kebabCase } from 'lodash';

import { metadataManager, MetadataType } from '../../../_common/metadata';
import { IStorageSystem } from '../../../_common/utils/storage-system/interfaces/storage-system.interface';
import { BaseGenerator } from '../../../code-generation/base-types/generator.base';

import { OrderFieldRenderer } from './renderers/order-field.renderer';

export class OrderFieldGenerator extends BaseGenerator {
  constructor(storage: IStorageSystem) {
    super({ storage, renderer: OrderFieldRenderer, directory: 'constants' });
  }

  public async run(): Promise<void> {
    await Promise.all(
      metadataManager.getClassesWithMetadataType(MetadataType.FieldSortable).map(async (klass) => {
        const fileName = `${kebabCase(klass.name)}-order-field.enum.ts`;
        this.storage.write(fileName, await new this.renderer(klass).render());
      })
    );
  }
}
