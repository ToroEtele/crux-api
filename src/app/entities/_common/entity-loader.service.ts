import { sync as globSync } from 'glob';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class EntityLoader {
  public static async loadAll(): Promise<void> {
    const entityFiles = globSync('./src/app/entities/**/*.entity.ts');
    for (const entityFile of entityFiles) {
      // eslint-disable-next-line n/no-unsupported-features/es-syntax
      await import(entityFile.replace('src/app/', '../../'));
    }
  }
}
