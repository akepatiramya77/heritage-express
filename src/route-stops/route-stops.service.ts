import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteStopEntity } from './route-stop.entity';
import { RouteEntity } from '../routes/route.entity';
import { StationEntity } from '../stations/stations.entity';
import { CreateRouteStopDto } from './dto/create-route-stop.dto';

@Injectable()
export class RouteStopsService {
  constructor(
    @InjectRepository(RouteStopEntity)
    private readonly stopRepo: Repository<RouteStopEntity>,

    @InjectRepository(RouteEntity)
    private readonly routeRepo: Repository<RouteEntity>,

    @InjectRepository(StationEntity)
    private readonly stationRepo: Repository<StationEntity>,
  ) {}

  async create(dto: CreateRouteStopDto) {
    const route = await this.routeRepo.findOne({
      where: { routeId: dto.routeId },
    });
    if (!route) throw new NotFoundException('Route not found');

    const station = await this.stationRepo.findOne({
      where: { stationId: dto.stationId },
    });
    if (!station) throw new NotFoundException('Station not found');

    const stop = this.stopRepo.create({
      route,
      station,
      stopOrder: dto.stopOrder,
      dayNo: dto.dayNo,
      arrivalTime: dto.arrivalTime,
      departureTime: dto.departureTime,
      distanceFromStart: dto.distanceFromStart ?? 0,
    });

    return this.stopRepo.save(stop);
  }

  async findByRoute(routeId: number) {
    return this.stopRepo.find({
      where: {
        route: { routeId },
      },
      order: { stopOrder: 'ASC' },
    });
  }
  async findAll() {
    return this.stopRepo.find({
      relations: ['route', 'station'],
        order: { stopOrder: 'ASC' },
      });
    }
  }


