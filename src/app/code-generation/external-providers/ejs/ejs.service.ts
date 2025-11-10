import { renderFile } from 'ejs';

export class EjsService {
  constructor(private readonly path: string) {}
  public async renderFile(data: Record<string, unknown>): Promise<string> {
    return renderFile(this.path, data);
  }
}
