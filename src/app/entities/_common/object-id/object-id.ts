import { NonEmptyArray } from '@common/base-types/non-empty-array.type';

import { ApiError } from '../../../_common/errors/api.error';

import { IObjectId } from './object-id.interface';
import { ObjectIdMarshaller } from './object-id.marshaller';
import { ObjectIdUnmarshaller } from './object-id.unmarshaller';

export class ObjectId implements IObjectId {
  public id: string;
  public idType: string;
  public type?: string;

  constructor(args: IObjectId) {
    this.id = args.id.toString();
    this.idType = (typeof args.id)[0].toUpperCase();
    this.type = args.type;
  }

  public numberId(type?: NonEmptyArray<string> | string): number {
    if (this.idType !== 'N') throw new Error('Non numeric ID!');
    this.validateType(type);
    return parseInt(this.id, 10);
  }

  public get filterValue(): string {
    return this.id;
  }

  public toUrlSafeBase64String(): string {
    return new ObjectIdMarshaller(this).toUrlSafeBase64String();
  }

  public static parse(id: number | string): ObjectId {
    if (this.isNumeric(id)) return new ObjectId({ id: Number(id) });
    return new ObjectId(new ObjectIdUnmarshaller(<string>id).toObjectId());
  }

  private static isNumeric(id: number | string): boolean {
    return typeof id === 'number' || Number(id).toString() === id;
  }

  public isEqual(other: ObjectId): boolean {
    return this.isEqualId(other) && this.type === other.type;
  }

  public isEqualId(other: ObjectId): boolean {
    return other instanceof ObjectId && this.id === other.id && this.idType === other.idType;
  }

  public toJSON(): number | string {
    return this.type ? this.toUrlSafeBase64String() : this.numberId();
  }

  private validateType(type?: NonEmptyArray<string> | string): void {
    if (!this.type || !type) {
      return;
    }

    if (typeof type === 'string' && type !== this.type) {
      throw new ApiError(ApiError.ErrorCodes.InvalidObjectIdType, { extensions: { expected: type, received: this.type } });
    }

    if (Array.isArray(type) && !type.includes(this.type)) {
      throw new ApiError(ApiError.ErrorCodes.InvalidObjectIdType, {
        extensions: { expected: type.join(', '), received: this.type }
      });
    }
  }
}
