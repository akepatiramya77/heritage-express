import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'station_master' })
export class StationEntity {
  @PrimaryGeneratedColumn({ name: 'station_id' })
  stationId: number;

  @Column({ name: 'station_code', unique: true })
  stationCode: string;

  @Column({ name: 'station_name' })
  stationName: string;

  @Column({ default: 'ACTIVE' })
  status: string;
}
