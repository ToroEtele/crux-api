import { sync as globSync } from 'glob';

export class EntityLoader {
  public static async loadAll(): Promise<void> {
    const entityFiles = globSync('./src/app/entities/**/*.entity.ts');
    for (const entityFile of entityFiles) {
      await import(entityFile.replace('src/app/', '../../'));
    }
  }
}
