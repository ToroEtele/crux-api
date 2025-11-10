import 'reflect-metadata';

import exitHook from 'exit-hook';

import { BootstrapService } from '../app/bootstrapping/bootstrap.service';
import { bootstrapableServices } from '../app/bootstrapping/services';
import { validators } from '../app/bootstrapping/validators';

const bootstrapService = new BootstrapService(bootstrapableServices, {
  validators
});

async function exit(error?: Error | string): Promise<never> {
  console.error(error);
  await bootstrapService.teardown();
  process.exit(error ? 1 : 0);
}

(async () => {
  await bootstrapService.bootstrap();
})().catch(exit);

/**
 * @note: The process.on('exit') event doesn't catch all the ways a process can exit.
 * This package is useful for cleaning up before exiting.
 **/
exitHook(() => void exit('💀  Shutting down.'));
