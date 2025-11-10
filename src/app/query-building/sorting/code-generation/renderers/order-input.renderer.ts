import { join as pathJoin } from 'node:path';
import { kebabCase } from 'lodash';
import pluralize from 'pluralize';

import { TypescriptRenderer } from '../../../../code-generation/base-types/typescript-renderer.base';

interface IOrderInputRendererData {
  entity: Function;
  flag?: string;
  names: string;
  pathName: string;
}

export class OrderInputRenderer extends TypescriptRenderer<IOrderInputRendererData> {
  constructor(private readonly entityKlass: Function) {
    super(pathJoin(__dirname, '../constants/order-input.ejs'));
  }

  protected get templateData(): IOrderInputRendererData {
    const klassName = this.entityKlass.name;

    return {
      entity: this.entityKlass,
      names: pluralize(klassName),
      pathName: kebabCase(klassName).toLocaleLowerCase()
    };
  }
}
