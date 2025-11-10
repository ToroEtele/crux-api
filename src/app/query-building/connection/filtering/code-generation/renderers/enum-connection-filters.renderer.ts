import { join as pathJoin } from 'node:path';

import { TypescriptRenderer } from '../../../../../code-generation/base-types/typescript-renderer.base';

export interface IEnumConnectionFiltersRendererData {
  enumType: string;
  enumPath: string;
  schemaType: string;
}

export class EnumConnectionFiltersRenderer extends TypescriptRenderer<IEnumConnectionFiltersRendererData> {
  constructor(
    private enumType: string,
    private schemaType: string,
    private enumPath: string
  ) {
    super(pathJoin(__dirname, '../constants/enum-connection-filters.ejs'));
  }

  protected get templateData(): IEnumConnectionFiltersRendererData {
    return { enumType: this.enumType, schemaType: this.schemaType, enumPath: this.enumPath };
  }
}
