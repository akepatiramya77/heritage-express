import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteEntity } from './route.entity';
import { PackageEntity } from '../packages/package.entity';
import { StationEntity } from '../stations/stations.entity';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(RouteEntity)
    private readonly routeRepo: Repository<RouteEntity>,

    @InjectRepository(PackageEntity)
    private readonly packageRepo: Repository<PackageEntity>,

    @InjectRepository(StationEntity)
    private readonly stationRepo: Repository<StationEntity>,
  ) {}

  async create(data: any) {
    const pkg = await this.packageRepo.findOne({
      where: { packageId: data.packageId },
    });

    if (!pkg) {
      throw new BadRequestException('Invalid packageId');
    }

    const fromStation = await this.stationRepo.findOne({
      where: { stationId: data.fromStationId },
    });

    if (!fromStation) {
      throw new BadRequestException('Invalid fromStationId');
    }

    const toStation = await this.stationRepo.findOne({
      where: { stationId: data.toStationId },
    });

    if (!toStation) {
      throw new BadRequestException('Invalid toStationId');
    }

    const route = new RouteEntity();
    route.routeName = data.routeName;
    route.package = pkg;
    route.fromStation = fromStation;
    route.toStation = toStation;
    route.distanceKm = data.distanceKm;
    route.status = 'ACTIVE';

    return this.routeRepo.save(route);
  }

  async findAll() {
    return this.routeRepo.find({
      relations: ['package', 'fromStation', 'toStation'],
    });
  }
}
