import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainEntity } from './train.entity';
import { TrainsService } from './trains.service';
import { TrainsController } from './trains.controller';
import { PackageEntity } from '../packages/package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrainEntity, PackageEntity])],
  providers: [TrainsService],
  controllers: [TrainsController],
})
export class TrainsModule {}
