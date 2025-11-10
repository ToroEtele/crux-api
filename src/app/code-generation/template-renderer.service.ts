import { EjsService } from './external-providers/ejs/ejs.service';

export interface ITemplate {
  path: string;
}

export interface ITemplateRendererArgs<TData> {
  template: ITemplate;
  templateData: TData;
}

export class TemplateRenderer<TData> {
  constructor(private readonly args: ITemplateRendererArgs<TData>) {}

  public render(): Promise<string> {
    const ejsService = new EjsService(this.args.template.path);
    return ejsService.renderFile(this.withDisclaimer(this.args.templateData));
  }

  private withDisclaimer(data: TData): TData & { disclaimer: string } {
    return {
      disclaimer: this.disclaimer,
      ...data
    };
  }

  public disclaimer = ['// This file was generated automatically.\n', '// All manual modifications will be lost!\n'].join('');
}
