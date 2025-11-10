import { TemplateRenderer } from '../template-renderer.service';

export abstract class BaseRenderer<TData> {
  constructor(private readonly templatePath: string) {}

  public async render(): Promise<string> {
    const rendererArgs = { template: { path: this.templatePath }, templateData: this.templateData };
    return await new TemplateRenderer(rendererArgs).render();
  }

  protected abstract get templateData(): TData;
}
