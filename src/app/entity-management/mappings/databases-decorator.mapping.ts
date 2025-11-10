import { TypeormEntityDecorator } from '@entity-management/external-providers/typeorm/decorators/typeorm-entity.decorator';

import { Database } from '../constants/database.enum';
import { EntityDecoratorArgs } from '../decorators/interfaces/entity-decorator.interface';

// import { Entity } from '../../entities/_generated/constants/entities-list.constant';

export type EntityDatabaseDecoratorFactory = (args: EntityDecoratorArgs<any>) => ClassDecorator;

export const DatabaseDecoratorsMap = new Map<Database, EntityDatabaseDecoratorFactory>([
  [Database.Mysql, (args) => new TypeormEntityDecorator(args).getDecorator()]
  // [Database.Opensearch, (args) => new ElasticsearchEntityDecorator(args).getDecorator()]
]);
