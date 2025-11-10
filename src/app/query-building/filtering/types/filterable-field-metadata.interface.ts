import { IFilterableEnumFieldMetadata } from '../interfaces/filterable-enum-field-metadata.interface';
import { IFilterablePrimitiveFieldMetadata } from '../interfaces/filterable-primitive-field-metadata.interface';
import { IFilterableUntypedFieldMetadata } from '../interfaces/filterable-untyped-field-metadata.interface';

export type FilterableFieldMetadata = IFilterableEnumFieldMetadata | IFilterablePrimitiveFieldMetadata | IFilterableUntypedFieldMetadata;
