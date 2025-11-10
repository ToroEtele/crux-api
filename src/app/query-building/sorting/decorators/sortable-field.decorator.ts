import { metadataManager, MetadataType } from '@common/metadata';

export interface ISortableFieldArgs {
  name?: string;
}

export function SortableField(args: ISortableFieldArgs = {}): PropertyDecorator {
  return (target, propertyKey) => {
    metadataManager.setPropertyMetadata(target.constructor, propertyKey, MetadataType.FieldSortable, {
      name: args.name ?? propertyKey.toString()
    });
  };
}
