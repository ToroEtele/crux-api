import prettier, { Options } from 'prettier';

import { BaseRenderer } from './renderer.base';

export abstract class TypescriptRenderer<TData> extends BaseRenderer<TData> {
  private readonly prettierOptions: Options = {
    arrowParens: 'avoid',
    bracketSpacing: true,
    endOfLine: 'lf',
    parser: 'typescript',
    printWidth: 120,
    quoteProps: 'as-needed',
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    useTabs: false
  };

  public override async render(): Promise<string> {
    const output = await super.render();
    return await prettier.format(output, this.prettierOptions);
  }
}
