 
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReflectorPrimitiveType } from './constants/primitive-type.enum';

interface IReflectTypeArgs {
  // Object needs to be allowed for consistency with es5 decorator types
  target: object;
  propertyKey: string | symbol | undefined;
  index?: number;
}

export class ReflectService {
  public static getPropertyTypeName(args: IReflectTypeArgs): ReflectorPrimitiveType {
    return this.getPropertyType(args).name;
  }

  public static getPropertyType({ target, propertyKey }: Omit<IReflectTypeArgs, 'index'>): any {
    const metadata = propertyKey ? Reflect.getMetadata('design:type', target, propertyKey) : Reflect.getMetadata('design:type', target);
    if (!metadata) throw this.getError({ target, propertyKey });
    return metadata;
  }

  public static getParamType({ target, propertyKey, index }: Required<IReflectTypeArgs>): any {
    const paramTypes = propertyKey ? Reflect.getOwnMetadata('design:paramtypes', target, propertyKey) : Reflect.getOwnMetadata('design:paramtypes', target);
    const paramType = paramTypes?.[index];
    if (!paramType) throw this.getError({ paramTypes, target, propertyKey, index });
    return paramType;
  }

  public static getType({ target, propertyKey, index }: IReflectTypeArgs): any {
    return typeof index === 'undefined' ? this.getPropertyType({ target, propertyKey }) : this.getParamType({ target, propertyKey, index });
  }

  private static getError(...args: any[]): Error {
    return new Error(`Missing metadata for: ${JSON.stringify(args)}`);
  }
}
