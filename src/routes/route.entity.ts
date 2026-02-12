import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PackageEntity } from '../packages/package.entity';
import { StationEntity } from '../stations/stations.entity';

@Entity({ name: 'route_master' })
export class RouteEntity {
  @PrimaryGeneratedColumn({ name: 'route_id' })
  routeId: number;

  @Column({ name: 'route_name' })
  routeName: string;

  @ManyToOne(() => PackageEntity, { nullable: false })
  @JoinColumn({ name: 'package_id' })
  package: PackageEntity;

  @ManyToOne(() => StationEntity, { nullable: false })
  @JoinColumn({ name: 'from_station_id' })
  fromStation: StationEntity;

  @ManyToOne(() => StationEntity, { nullable: false })
  @JoinColumn({ name: 'to_station_id' })
  toStation: StationEntity;

  @Column({ name: 'distance_km', type:'int',default:0 })
  distanceKm: number;

  @Column({ default: 'ACTIVE' })
  status: string;
}

