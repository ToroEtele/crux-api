import { FilterableFieldKind } from '../constants/filterable-field-kind.enum';

export interface IFilterableEnumFieldMetadata {
  kind: FilterableFieldKind.Enum;
  name: string;
  propertyKey: string;
  connectionFilterType: string;
  connectionFilterFileName: string;
  admin: boolean;
}
