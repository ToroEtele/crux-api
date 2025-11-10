import { createParameterDecorator } from 'type-graphql';

import { fieldsList, FieldsListOptions } from './graphql-fields';

export function RequestedFields(options: FieldsListOptions = {}): ReturnType<typeof createParameterDecorator> {
  return createParameterDecorator(({ info }): string[] => fieldsList(info, options));
}
