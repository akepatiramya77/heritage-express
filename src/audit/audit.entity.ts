import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'audit_log' })
export class AuditLogEntity {

  @PrimaryGeneratedColumn({ name: 'audit_id' })
  auditId: number;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @Column({ length: 20 })
  action: string;

  @Column({ length: 50 })
  entity: string;

  @Column({ name: 'entity_id', nullable: true })
  entityId: number;

  @Column({ length: 200 })
  endpoint: string;

  @Column({ length: 10 })
  method: string;

  @Column({ type: 'jsonb', nullable: true })
  requestBody: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
