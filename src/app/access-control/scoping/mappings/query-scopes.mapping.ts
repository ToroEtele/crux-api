import { SqlQueryBuilder } from '@query-building/external-providers/sql/sql-query-builder';
import { Constructable } from '@common/base-types/constructable.type';
import { ScopingFunction } from '../types/scoping-function.type';

import { AvatarImage } from '@entities/avatar-image/avatar-image.entity';


export const defaultQueryScopeMappings = new Map<Constructable<any>, ScopingFunction<any>>([
  [AvatarImage, (query, { user }) => (<SqlQueryBuilder<AvatarImage>>query).innerJoin('user.avatarImage', 'user', 'user.id = :userId', { userId: user?.id })],
]);
