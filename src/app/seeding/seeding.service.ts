import { EntityManager } from 'typeorm';
import fs from 'node:fs';

import { seedingMetadataMapping } from './mappings/seeding-metadata.mapping';
import { SeedingMetadata } from './interfaces/seeding-metadata.interface';
import { SeedFactory } from './factory/seed.factory';

import { IteratorUtil } from '@utils/iterator.util';
import { config } from '@config/config.service';

export class SeedingService {
  public seedingDisabled: boolean;
  seedingOrder = SeedingService.getFixturesOrder();

  constructor(public readonly seedingsPath: string, public readonly entityManager: EntityManager) {
    this.seedingDisabled = config.environment === 'production';
  }

  public async run(): Promise<void> {
    if (this.seedingDisabled) throw new Error('Seeding is not allowed in production!');

    const factories = IteratorUtil.createAsyncIterable(await this.getFactories());

    for await (const factory of factories) {
      await factory.run();
    }
  }

  private async getFactories(): Promise<Array<SeedFactory<any>>> {
    const seedingFiles = fs.readdirSync(this.seedingsPath);

    const factoriesWithIndex = await Promise.all(
      seedingFiles.map(async (file) => {
        const seedingName = file.replace('.json', '');

        const metadata = seedingMetadataMapping.get(seedingName);
        const index = this.seedingOrder.get(seedingName);

        if (!metadata || index === undefined) {
          throw new Error(`Metadata not found for seeding file: ${file}`);
        }

        const factory = await this.getFactory(file, metadata);

        return { index, factory };
      })
    );
    return factoriesWithIndex.sort((factory, otherFactory) => factory.index - otherFactory.index).map((factory) => factory.factory);
  }

  public async getFactory<TEntity>(fileName: string, metadata: SeedingMetadata<TEntity>): Promise<SeedFactory<TEntity>> {
    const seedingData = fs.readFileSync(`${this.seedingsPath}/${fileName}`, 'utf-8');

    return new SeedFactory({
      name: fileName,
      entityClass: metadata.entity,
      entityManager: this.entityManager,
      data: JSON.parse(seedingData),
      customSave: metadata.customSave
    });
  }

  /**
   * @notes The order of the metadatas in seedingMetadataMapping is the order in which seedings should be inserted to prevent foreign key constraint errors
   * @returns Map<string, number> - Map with the order of the fixtures
   */
  private static getFixturesOrder(): Map<string, number> {
    return [...seedingMetadataMapping.keys()].reduce((acc, fixtureKey, index) => acc.set(fixtureKey, index), new Map<string, number>());
  }
}
