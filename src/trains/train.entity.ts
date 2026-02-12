import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PackageEntity } from '../packages/package.entity';
import { OneToMany } from 'typeorm';
import { TrainCoachEntity } from '../train-coaches/train-coach.entity';

@Entity({ name: 'train_master' })
export class TrainEntity {
  @PrimaryGeneratedColumn({ name: 'train_id' })
  trainId: number;

  @Column({ name: 'train_no' })
  trainNo: string;

  @Column({ name: 'train_name' })
  trainName: string;

  @ManyToOne(() => PackageEntity, { nullable: false })
  @JoinColumn({ name: 'package_id' })   
  package: PackageEntity;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date;

  @Column({ default: 'ACTIVE' })
  status: string;
  @OneToMany(() => TrainCoachEntity, (coach) => coach.train)
  coaches: TrainCoachEntity[];

}
