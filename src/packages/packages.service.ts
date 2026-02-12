import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PackageEntity } from './package.entity';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(PackageEntity)
    private readonly packageRepo: Repository<PackageEntity>,
  ) {}

  async findAll(): Promise<PackageEntity[]> {
    return this.packageRepo.find({
      order: { startDate: 'ASC' },
    });
  }

  async findActive(): Promise<PackageEntity[]> {
    return this.packageRepo.find({
      where: { activeFlag: true },
      order: { startDate: 'ASC' },
    });
  }

  async create(dto: CreatePackageDto): Promise<PackageEntity> {
    const pkg = this.packageRepo.create(dto);
    return this.packageRepo.save(pkg);
  }
  
  async update(
    id: number,
    dto: UpdatePackageDto,
  ): Promise<PackageEntity> {
    const pkg = await this.packageRepo.findOne({ where: { packageId: id } });

    if (!pkg) {
      throw new NotFoundException('Package not found');
    }

    Object.assign(pkg, dto);
    return this.packageRepo.save(pkg);
  }

  async remove(id: number): Promise<void> {
    await this.packageRepo.delete(id);
  }
}
