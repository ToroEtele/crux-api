import { FilterableFieldKind } from '../constants/filterable-field-kind.enum';

export interface IFilterablePrimitiveFieldMetadata {
  kind: FilterableFieldKind.Primitive;
  name: string;
  propertyKey: string;
  connectionFilterType: Function;
  admin: boolean;
}
