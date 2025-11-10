import minimist from 'minimist';

import { database } from '@entity-management/constants/databases/typeorm.config';

export enum MigrationsAction {
  Run = 'migrations:run',
  Revert = 'migrations:revert'
}

const { action } = minimist(process.argv.slice(2), {
  string: 'action',
  alias: { a: 'action' }
});

async function exit(error?: Error): Promise<void> {
  // if (error) Logger.error(error);
  if (database.isInitialized) await database.destroy();

  process.exit(error ? 1 : 0);
}

export async function migrations(): Promise<void> {
  await database.initialize();

  if (action === MigrationsAction.Run) {
    await database.runMigrations({ transaction: 'all' });
  } else if (action === MigrationsAction.Revert) {
    await database.undoLastMigration({ transaction: 'all' });
  } else {
    throw new Error(`Unknown action "${action}"!`);
  }

  await exit();
}

if (require.main === module) {
  (async () => {
    await migrations();
  })().catch((error) => {
    console.error(error);
  });
}
