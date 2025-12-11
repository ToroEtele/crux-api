import { DataSource } from 'typeorm';

import { allEntities } from '@entities/_generated/constants/entities-list.constant';
import { config } from '@config/config.service';

import migrations from '../../../../db/migrations';

export const database = new DataSource({
  type: 'mysql',
  url: config.databaseUrl,
  entities: allEntities,
  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: true,
  migrations,
  supportBigNumbers: true,
  bigNumberStrings: false,
  extra: {
    decimalNumbers: true
  }
});
