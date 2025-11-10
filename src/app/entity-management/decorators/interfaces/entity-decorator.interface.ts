import { IEntityMetadataDecoratorArgs } from '../../../entities/_common/metadata/decorators/entity-metadata.decorator';

export type ITypeORMEntityDecoratorArgs = IEntityMetadataDecoratorArgs & {
  tableName?: string;
  isView?: boolean;
  discriminatorValue?: boolean | string;
};

export type IESEntityDecoratorArgs<TEntity> = IEntityMetadataDecoratorArgs & {
  indexName?: string;
  primaryProperties?: Array<keyof TEntity>;
};

export type EntityDecoratorArgs<TEntity> = IESEntityDecoratorArgs<TEntity> | ITypeORMEntityDecoratorArgs;
