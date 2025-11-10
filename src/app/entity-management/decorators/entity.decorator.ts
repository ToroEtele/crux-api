import { ObjectType as ObjectTypeDecoratorFactory, InterfaceType as InterfaceTypeDecoratorFactory } from 'type-graphql';
import { TableInheritance as TableInheritanceFactory } from 'typeorm';

import { GenericEntity as GenericEntityDecoratorFactory } from '@entities/_common/metadata/decorators/entity-metadata.decorator';
import { BaseClassDecorator } from '../../_common/base-types/decorators/base-class.decorator';

import { EntityDecoratorArgs } from './interfaces/entity-decorator.interface';
import { metadataManager, MetadataType } from '@common/metadata';

import { DatabaseDecoratorsMap } from '@entity-management/mappings/databases-decorator.mapping';

class EntityDecorator<TEntity> extends BaseClassDecorator {
  constructor(private readonly options: EntityDecoratorArgs<TEntity>) {
    super();
  }

  public getDecorator(): ClassDecorator {
    return (targetConstructor) => {
      this.applyMetadataDecorators(targetConstructor);
      this.applyGraphQLDecorators(targetConstructor);
      this.applyDatabaseDecorators(targetConstructor);
      this.applyTableInheritanceDecorators(targetConstructor);
    };
  }

  private applyMetadataDecorators(targetConstructor: Function): void {
    GenericEntityDecoratorFactory(this.options)(targetConstructor);
  }

  private applyDatabaseDecorators(targetConstructor: Function): void {
    const database = metadataManager.fetchClassMetadata(targetConstructor, MetadataType.Entity).database;
    if (!database) return;
    const databaseDecorator = DatabaseDecoratorsMap.get(database);
    if (!databaseDecorator) throw new Error(`Database decorator is missing for ${this.options.database}`);
    databaseDecorator(this.options)(targetConstructor);
  }

  private applyGraphQLDecorators(targetConstructor: Function): void {
    if (this.options.abstract) {
      InterfaceTypeDecoratorFactory()(targetConstructor);
    } else {
      const name = this.options.name;
      if (name) {
        ObjectTypeDecoratorFactory(name, { implements: this.options.implements })(targetConstructor);
      } else {
        ObjectTypeDecoratorFactory({ implements: this.options.implements })(targetConstructor);
      }
    }
  }

  private applyTableInheritanceDecorators(targetConstructor: Function): void {
    if (!this.options.discriminatorColumn) return;
    TableInheritanceFactory({
      column: this.options.discriminatorColumn
    })(targetConstructor);
  }
}

/**
 * STI with Interface type:
 *
 * In order to use STI, options.discriminatorValue should be used with options.implements,
 * while options.implements decorated entity should be abstract and have options.abstract
 * set to true and options.discriminatorColumn set
 *
 * @example
 * ```ts
 * @Entity({ database: Database.Business, tableName: "vehicles", abstract: true, discriminatorColumn: { type: "varchar", name: "type" } })
 * export abstract class Vehicle {}
 *
 * @Entity({ implements: Vehicle, discriminatorValue: "car", retrievable: true })
 * export class Car extends Vehicle {}
 * ```
 *
 * @param {boolean | undefined} options.abstract flags an STI interface
 * @param {Constructable<unknown> | undefined} options.implements implemented STI interface
 * @param {string | ColumnOptions | undefined} options.discriminatorColumn column used to detect the type
 * @param {boolean | string | undefined} options.discriminatorValue value of the column that differentiates the type
 */
export const Entity = <TEntity>(options: EntityDecoratorArgs<TEntity>): ClassDecorator => new EntityDecorator<TEntity>(options).getDecorator();
