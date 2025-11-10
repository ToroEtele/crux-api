import { MetadataManager } from './metadata-manager';
import type { ReturnTypeFunc } from 'type-graphql/build/typings/decorators/types';

import { IEntityMetadataDecoratorArgs } from '../../entities/_common/metadata/decorators/entity-metadata.decorator';
import { FilterableFieldMetadata } from '@query-building/filtering/types/filterable-field-metadata.interface';
// import { IESEntityDecoratorArgs } from '../../entity-management/decorators/interfaces/entity-decorator.interface';

export enum MetadataType {
  Aggregate = 'Aggregate',
  Entity = 'Entity',
  // EntityElasticsearch = 'EntityElasticsearch',
  FieldFilterable = 'FieldFilterable',
  FieldSortable = 'FieldSortable'
}

export interface IMetadata {
  [MetadataType.Aggregate]: {
    dimension?: true;
    metric?: true;
    nullable?: boolean;
    returnTypeFunc?: ReturnTypeFunc;
    sumReturnTypeFunc?: ReturnTypeFunc;
    typeName: string;
  };
  [MetadataType.Entity]: IEntityMetadataDecoratorArgs;
  // [MetadataType.EntityElasticsearch]: IESEntityDecoratorArgs<any>;
  [MetadataType.FieldFilterable]: FilterableFieldMetadata;
  [MetadataType.FieldSortable]: { name: string };
}

export const metadataManager = new MetadataManager<IMetadata>();
