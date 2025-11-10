import { kebabCase } from 'lodash';

import { metadataManager, MetadataType } from '../../../../_common/metadata';
import { IStorageSystem } from '../../../../_common/utils/storage-system/interfaces/storage-system.interface';
import { BaseGenerator } from '../../../../code-generation/base-types/generator.base';

import { ConnectionFiltersRenderer } from './renderers/connection-filters.renderer';

export class ConnectionFiltersGenerator extends BaseGenerator {
  constructor(storage: IStorageSystem) {
    super({ storage, renderer: ConnectionFiltersRenderer, directory: 'connection-filters' });
  }

  public async run(): Promise<void> {
    await Promise.all(
      metadataManager.getClassesWithMetadataType(MetadataType.FieldFilterable).map(async (entityKlass) => {
        const fileName = `${kebabCase(entityKlass.name)}-connection-filter.input-type.ts`;
        // eslint-disable-next-line new-cap
        this.storage.write(fileName, await new this.renderer(entityKlass).render());
      })
    );
  }
}
