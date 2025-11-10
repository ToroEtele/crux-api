import { DataSource } from 'typeorm';

import { database } from '@entity-management/constants/databases/typeorm.config';
import { Database } from '../../../constants/database.enum';
import { StrictMap } from '@common/strict-map';

export const typeormDataSourcesMap = new StrictMap<Database, DataSource>('typeORMDataSourcesMap', [[Database.Mysql, database]]);
