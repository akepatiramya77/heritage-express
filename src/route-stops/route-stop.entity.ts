import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RouteEntity } from '../routes/route.entity';
import { StationEntity } from '../stations/stations.entity';

@Entity({ name: 'route_stop' })
export class RouteStopEntity {
  @PrimaryGeneratedColumn({ name: 'stop_id' })
  stopId: number;

  @ManyToOne(() => RouteEntity, { eager: true })
  @JoinColumn({ name: 'route_id' })
  route: RouteEntity;

  @ManyToOne(() => StationEntity, { eager: true })
  @JoinColumn({ name: 'station_id' })
  station: StationEntity;

  @Column({ name: 'stop_order' })
  stopOrder: number;

  @Column({ name: 'day_no' })
  dayNo: number;

  @Column({ type: 'time', nullable: true })
  arrivalTime: string;

  @Column({ type: 'time', nullable: true })
  departureTime: string;

  @Column({ name: 'distance_from_start', default: 0 })
  distanceFromStart: number;

  @Column({ default: 'ACTIVE' })
  status: string;
}
