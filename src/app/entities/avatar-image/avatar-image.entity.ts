import { Column, PrimaryGeneratedColumn } from 'typeorm';

import { Entity } from '@entity-management/decorators/entity.decorator';
import { Database } from '@entity-management/constants/database.enum';
import { Field } from '@entities/_common/decorators/field.decorator';
import { ObjectId } from '@entities/_common/object-id/object-id';

@Entity({ database: Database.Mysql })
export class AvatarImage {
  @PrimaryGeneratedColumn()
  @Field((_type) => ObjectId)
  public readonly id: number;

  @Field((_type) => String)
  @Column({ type: 'text' })
  bytes: string;
}
