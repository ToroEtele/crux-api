import { kebabCase, pick, uniqBy } from 'lodash';
import { join as pathJoin } from 'node:path';
import pluralize from 'pluralize';

import { metadataManager, MetadataType } from '../../../../../_common/metadata';
import { TypescriptRenderer } from '../../../../../code-generation/base-types/typescript-renderer.base';
import { FilterableFieldKind } from '../../../../filtering/constants/filterable-field-kind.enum';
import { IFilterableEnumFieldMetadata } from '../../../../filtering/interfaces/filterable-enum-field-metadata.interface';
import { IFilterablePrimitiveFieldMetadata } from '../../../../filtering/interfaces/filterable-primitive-field-metadata.interface';
import { IFilterableUntypedFieldMetadata } from '../../../../filtering/interfaces/filterable-untyped-field-metadata.interface';

export interface IConnectionFiltersRendererData {
  entity: Function;
  names: string;
  untypedFields: IFilterableUntypedFieldMetadata[];
  pathName: string;
  primitives: {
    fields: IFilterablePrimitiveFieldMetadata[];
    hasBooleanFields: boolean;
    hasDateFields: boolean;
    hasFloatFields: boolean;
    hasIntFields: boolean;
    hasStringArrayFields: boolean;
    hasFloatArrayFields: boolean;
    hasIntArrayFields: boolean;
    hasStringFields: boolean;
  };
  enums: {
    fields: IFilterableEnumFieldMetadata[];
    fieldImports: Array<Pick<IFilterableEnumFieldMetadata, 'connectionFilterFileName' | 'connectionFilterType'>>;
  };
}

const sortFields = (a: IFilterableEnumFieldMetadata, b: IFilterableEnumFieldMetadata): number => a.connectionFilterType.localeCompare(b.connectionFilterType);

export class ConnectionFiltersRenderer extends TypescriptRenderer<IConnectionFiltersRendererData> {
  constructor(private readonly entityKlass: Function) {
    super(pathJoin(__dirname, '../constants/connection-filters.ejs'));
  }

  protected get templateData(): IConnectionFiltersRendererData {
    const [primitiveFields, enumFields, untypedFields] = metadataManager
      .getClassPropertiesWithMetadataType(this.entityKlass, MetadataType.FieldFilterable)
      .flatMap((propertyKey) => metadataManager.fetchPropertyMetadata(this.entityKlass, propertyKey, MetadataType.FieldFilterable))
      .reduce(
        (acc, field) => {
          if (field.kind === FilterableFieldKind.Primitive) {
            acc[0].push(field);
          } else if (field.kind === FilterableFieldKind.Enum) {
            acc[1].push(field);
          } else if (field.kind === FilterableFieldKind.Untyped) {
            acc[2].push(field);
          }
          return acc;
        },
        [new Array<IFilterablePrimitiveFieldMetadata>(), new Array<IFilterableEnumFieldMetadata>(), new Array<IFilterableUntypedFieldMetadata>()]
      );

    /**
     * Ignores duplicate imports for enums used in multiple fields
     */
    const fieldImports = uniqBy(
      enumFields.sort(sortFields).map((field) => pick(field, ['connectionFilterType', 'connectionFilterFileName'])),
      'connectionFilterType'
    );

    return {
      entity: this.entityKlass,
      names: pluralize(this.entityKlass.name),
      untypedFields,
      pathName: kebabCase(this.entityKlass.name).toLocaleLowerCase(),
      primitives: {
        fields: primitiveFields,
        hasBooleanFields: this.hasConnectionFilter(primitiveFields, 'ConnectionBooleanFilterInput'),
        hasDateFields: this.hasConnectionFilter(primitiveFields, 'ConnectionDateFilterInput'),
        hasFloatFields: this.hasConnectionFilter(primitiveFields, 'ConnectionFloatFilterInput'),
        hasIntFields: this.hasConnectionFilter(primitiveFields, 'ConnectionIntFilterInput'),
        hasStringArrayFields: this.hasConnectionFilter(primitiveFields, 'ConnectionStringArrayFilterInput'),
        hasFloatArrayFields: this.hasConnectionFilter(primitiveFields, 'ConnectionFloatArrayFilterInput'),
        hasIntArrayFields: this.hasConnectionFilter(primitiveFields, 'ConnectionIntArrayFilterInput'),
        hasStringFields: this.hasConnectionFilter(primitiveFields, 'ConnectionStringFilterInput')
      },
      enums: {
        fields: enumFields.sort(sortFields),
        fieldImports
      }
    };
  }

  private hasConnectionFilter(fieldsMetadata: IFilterablePrimitiveFieldMetadata[], typeName: string): boolean {
    return fieldsMetadata.some((predicate) => predicate.connectionFilterType.name === typeName);
  }
}
