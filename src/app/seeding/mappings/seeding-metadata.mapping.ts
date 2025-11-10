/* eslint-disable @typescript-eslint/no-unused-vars */
import { BotanicSpecie } from '@entities/botanic-specie/botanic-specie.entity';

import { SeedVariety } from '@entities/seed-variety/seed-variety.entity';
import { InputCategory } from '@entities/input-category/input-category.entity';
import { SeedingMetadata } from '../interfaces/seeding-metadata.interface';
import { Measure } from '@entities/measure/measure.entity';
import { Input } from '@entities/input/input.entity';
import { User } from '@entities/user/user.entity';
import { Provider } from '@entities/provider/provider.entity';
import { Seed } from '@entities/seed/seed.entity';
import { Farm } from '@entities/farm/farm.entity';
import { Currency } from '@entities/currency/currency.entity';

export const seedingMetadataMapping = new Map<string, SeedingMetadata<Record<string, unknown>>>([
  [
    'users',
    {
      entity: User
    }
  ],
  [
    'currencies',
    {
      entity: Currency
    }
  ],
  [
    'farms',
    {
      entity: Farm
    }
  ],
  [
    'botanic-species',
    {
      entity: BotanicSpecie
    }
  ],
  [
    'seed-varieties',
    {
      entity: SeedVariety
    }
  ],
  [
    'measures',
    {
      entity: Measure
    }
  ],
  [
    'input-categories',
    {
      entity: InputCategory
    }
  ],
  [
    'inputs',
    {
      entity: Input
    }
  ],
  [
    'providers',
    {
      entity: Provider
    }
  ],
  [
    'seeds',
    {
      entity: Seed
    }
  ]
]);
