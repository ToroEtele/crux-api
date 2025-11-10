import { Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from '@entities/user/user.entity';
import { Database } from '@entity-management/constants/database.enum';
import { Entity } from '@entity-management/decorators/entity.decorator';

@Entity({ database: Database.Mysql, skipId: true, retrievable: false })
export class Session {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({ name: 'expires_at' })
  expiresAt: Date;

  @Column({ name: 'token', unique: true })
  token: string;

  @Column({ name: 'ip_address', type: 'varchar', length: 255, nullable: true })
  ipAddress: string;

  @Column({ name: 'user_agent', type: 'varchar', length: 255, nullable: true })
  userAgent: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'impersonated_by', type: 'text', nullable: true })
  impersonatedBy: string;

  @Column({ name: 'user_id' })
  userId!: number;

  @ManyToOne((_type) => User, (user) => user.sessions)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
