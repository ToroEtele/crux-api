import { FilterableFieldKind } from '../constants/filterable-field-kind.enum';

export interface IFilterableUntypedFieldMetadata {
  kind: FilterableFieldKind.Untyped;
  name: string;
  propertyKey: string;
  admin: boolean;
}
