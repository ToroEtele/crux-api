import { IBootstrapableService } from '../../_common/interfaces/bootstrapable.interface';
import { database } from '@entity-management/constants/databases/typeorm.config';

export class DatabaseConnectionService implements IBootstrapableService {
  public async bootstrap(): Promise<void> {
    await database.initialize();
  }

  public async teardown(): Promise<void> {
    await database.destroy();
  }
}

export const databaseConnection = new DatabaseConnectionService();
