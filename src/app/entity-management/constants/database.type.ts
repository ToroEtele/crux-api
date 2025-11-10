import { Database } from './database.enum';

export enum DatabaseType {
  ES,
  SQL,
  MONGO,
  DYNAMO
}

export const DatabaseTypeMap: Record<Database, DatabaseType> = {
  [Database.Mysql]: DatabaseType.SQL,
  [Database.Opensearch]: DatabaseType.ES
};
