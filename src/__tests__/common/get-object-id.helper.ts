import { ObjectId } from '../../app/entities/_common/object-id/object-id';
import { BaseEntity } from '@common/base-types/base.entity';

export function getEntityId(entity: BaseEntity): ObjectId {
  return new ObjectId({ type: entity.constructor.name, id: entity.id });
}
