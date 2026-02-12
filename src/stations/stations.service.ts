import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StationEntity } from './stations.entity';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(StationEntity)
    private readonly stationRepo: Repository<StationEntity>,
  ) {}

  findAll(): Promise<StationEntity[]> {
    return this.stationRepo.find();
  }

  async create(dto: CreateStationDto): Promise<StationEntity> {
    const station = this.stationRepo.create(dto);
    return this.stationRepo.save(station);
  }

  async update(
    id: number,
    dto: UpdateStationDto,
  ): Promise<StationEntity> {
    const station = await this.stationRepo.findOne({
      where: { stationId: id },
    });

    if (!station) {
      throw new NotFoundException('Station not found');
    }

    Object.assign(station, dto);
    return this.stationRepo.save(station);
  }

  async remove(id: number): Promise<void> {
    await this.stationRepo.delete(id);
  }
}
