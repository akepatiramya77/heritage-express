import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationEntity } from './stations.entity';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StationEntity])],
  providers: [StationsService],
  controllers: [StationsController],
})
export class StationsModule {}
