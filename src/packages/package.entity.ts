import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'package_master' })
export class PackageEntity {

  @PrimaryGeneratedColumn({ name: 'package_id' })
  packageId: number;
  
  @Column({ name: 'package_name', length: 100 })
  packageName: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @Column({ type: 'int' })
  duration: number;

  @Column({ name: 'active_flag', type: 'boolean', default: true })
  activeFlag: boolean;
}
