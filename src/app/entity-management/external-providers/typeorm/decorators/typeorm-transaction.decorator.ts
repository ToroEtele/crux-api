import { EntityManager } from 'typeorm';

import { TypeORMEntityManager } from '../typeorm-entity-manager.adapter';
import { InternalServerError } from '@common/errors/internal-server.error';
import { database } from '@entity-management/constants/databases/typeorm.config';

export function TypeORMTransaction(): MethodDecorator {
  return (target, methodName, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    // descriptor.value is the original function's implementation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor.value = function (...args: any[]) {
      const transactionCallback = (entityManager: EntityManager): Promise<unknown> => {
        const argsWithInjectedTransactionManager = [...args];
        const paramTypes: unknown[] = Reflect.getMetadata('design:paramtypes', target, methodName);

        const filteredParamTypes = paramTypes.filter((paramType) => paramType === TypeORMEntityManager);
        if (filteredParamTypes.length > 1) {
          throw new InternalServerError('Multiple TypeORMEntityManager parameters are not supported.');
        }

        const index = paramTypes.findIndex((paramType) => paramType === TypeORMEntityManager);
        if (index === -1) {
          throw new InternalServerError('TypeORMEntityManager parameter is missing.');
        }

        if (index > argsWithInjectedTransactionManager.length - 1) {
          // fill missing optional element args with undefined
          argsWithInjectedTransactionManager.push(...new Array(index - argsWithInjectedTransactionManager.length));
        }

        argsWithInjectedTransactionManager.splice(index, 0, new TypeORMEntityManager(entityManager));
        return originalMethod.apply(this, argsWithInjectedTransactionManager);
      };

      return database.manager.transaction(transactionCallback);
    };
  };
}
