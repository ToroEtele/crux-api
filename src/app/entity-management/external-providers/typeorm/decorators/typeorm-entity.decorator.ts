import {
  ChildEntity as TypeORMChildEntityDecoratorFactory,
  Entity as TypeORMEntityDecoratorFactory,
  ViewEntity as TypeORMViewEntityDecoratorFactory
} from 'typeorm';

import { ITypeORMEntityDecoratorArgs } from '../../../decorators/interfaces/entity-decorator.interface';
import { BaseClassDecorator } from '@common/base-types/decorators/base-class.decorator';

export class TypeormEntityDecorator implements BaseClassDecorator {
  constructor(private readonly args: ITypeORMEntityDecoratorArgs) {}

  public getDecorator(): ClassDecorator {
    return (targetConstructor) => {
      if (this.args.isView) return TypeORMViewEntityDecoratorFactory(this.args.tableName)(targetConstructor);
      if (this.args.discriminatorValue !== undefined) return TypeORMChildEntityDecoratorFactory(this.args.discriminatorValue)(targetConstructor);
      return TypeORMEntityDecoratorFactory(this.args.tableName)(targetConstructor);
    };
  }
}
