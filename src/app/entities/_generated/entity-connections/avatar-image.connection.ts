// This file was generated automatically.
// All manual modifications will be lost!
import { ValidateNested } from 'class-validator';
import { ArgsType, Int, ObjectType } from 'type-graphql';

import { IConnection } from '../../../query-building/connection/interfaces/connection.interface';
import { PageInfo } from '../../../query-building/connection/models/page-info.model';
import { PaginationArgs } from '../../../query-building/pagination/models/pagination-args.model';
import { Field as GraphQLField } from '../../_common/decorators/field.decorator';
import { AvatarImage } from '../../avatar-image/avatar-image.entity';

@ObjectType()
export class AvatarImageConnection implements IConnection<AvatarImage> {
  @GraphQLField(() => [AvatarImage], { description: 'A list of nodes.' })
  public edges!: AvatarImage[];

  @GraphQLField({ description: 'Information to aid in pagination.' })
  public pageInfo!: PageInfo;

  @GraphQLField(_type => Int, { description: 'Identifies the total count of AvatarImages in the connection.' })
  public totalCount!: number;
}

@ArgsType()
export class AvatarImagesArgs extends PaginationArgs {}
