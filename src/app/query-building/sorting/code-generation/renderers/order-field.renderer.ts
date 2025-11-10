import { join as pathJoin } from 'node:path';
import pluralize from 'pluralize';

import { metadataManager, MetadataType } from '../../../../_common/metadata';
import { TypescriptRenderer } from '../../../../code-generation/base-types/typescript-renderer.base';

interface IOrderFieldRendererData {
  entity: Function;
  names: string;
  fields: Array<{
    name: string;
    propertyKey: PropertyKey;
  }>;
  flag?: string;
}

export class OrderFieldRenderer extends TypescriptRenderer<IOrderFieldRendererData> {
  constructor(private readonly entityKlass: Function) {
    super(pathJoin(__dirname, '../constants/order-field.ejs'));
  }

  protected get templateData(): IOrderFieldRendererData {
    return {
      entity: this.entityKlass,
      names: pluralize(this.entityKlass.name),
      fields: metadataManager.getClassPropertiesWithMetadataType(this.entityKlass, MetadataType.FieldSortable).flatMap((propertyKey) => {
        const metadata = metadataManager.fetchPropertyMetadata(this.entityKlass, propertyKey, MetadataType.FieldSortable);

        return metadata.map(({ name }) => {
          return {
            name,
            propertyKey
          };
        });
      })
    };
  }
}
