import { ClassType, Field, Int, ObjectType } from 'type-graphql';

import { IPage } from '../../pagination/interfaces/page.interface';
import { PageInfo } from '@query-building/connection/models/page-info.model';

export type PaginatedResponseClassType<TItem extends object> = ClassType<IPage<TItem>>;

export function PaginatedResponse<TItem extends object>(TItemClass: ClassType<TItem>): PaginatedResponseClassType<TItem> {
  @ObjectType(`Paginated${TItemClass.name}Response`)
  class PaginatedResponseClass {
    @Field((_type) => [TItemClass])
    edges!: TItem[];

    @Field((_type) => Int)
    totalCount!: number;

    @Field((_type) => PageInfo)
    pageInfo!: PageInfo;
  }
  return PaginatedResponseClass;
}
