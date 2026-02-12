import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainEntity } from './train.entity';
import { PackageEntity } from '../packages/package.entity';

@Injectable()
export class TrainsService {
  constructor(
    @InjectRepository(TrainEntity)
    private readonly trainRepo: Repository<TrainEntity>,

    @InjectRepository(PackageEntity)
    private readonly packageRepo: Repository<PackageEntity>,
  ) {}

  async create(data: any) {
    const pkg = await this.packageRepo.findOne({
      where: { packageId: data.packageId },
    });

    if (!pkg) throw new NotFoundException('Package not found');

    const train = this.trainRepo.create({
      trainId: data.trainId,
      trainNo: data.trainNo,
      trainName: data.trainName,
      startDate: data.startDate,
      endDate: data.endDate,
      package: pkg,
      status: 'ACTIVE',
    });

    return this.trainRepo.save(train);
  }

  async findAll() {
    return this.trainRepo.find({ relations: ['package'] });
  }
}
