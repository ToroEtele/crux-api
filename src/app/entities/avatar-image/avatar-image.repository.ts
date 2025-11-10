import { EntityManager } from 'typeorm';

import { TypeORMEntityManager } from '@entity-management/external-providers/typeorm/typeorm-entity-manager.adapter';
import { BaseSqlRepository } from '@entity-management/external-providers/typeorm/base-sql.repository';

import { AvatarImage } from './avatar-image.entity';

export class AvatarImageRepository extends BaseSqlRepository<AvatarImage> {
  constructor(manager: EntityManager) {
    super(new TypeORMEntityManager(manager), AvatarImage);
  }
}
