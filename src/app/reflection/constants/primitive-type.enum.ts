import { registerGraphQLEnum } from '@entities/_common/decorators/register-graphql-enum';

export enum ReflectorPrimitiveType {
  'Array' = 'Array',
  'String' = 'String',
  'Boolean' = 'Boolean',
  'Number' = 'Number',
  'Date' = 'Date'
}

registerGraphQLEnum(ReflectorPrimitiveType, {
  name: 'PrimitiveType'
});
