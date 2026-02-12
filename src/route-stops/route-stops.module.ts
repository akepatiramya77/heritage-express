import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RouteStopsService } from './route-stops.service';
import { RouteStopsController } from './route-stops.controller';

import { RouteStopEntity } from './route-stop.entity';
import { RouteEntity } from '../routes/route.entity';
import { StationEntity } from '../stations/stations.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RouteStopEntity,
      RouteEntity,     
      StationEntity,   
    ]),
  ],
  controllers: [RouteStopsController],
  providers: [RouteStopsService],
})
export class RouteStopsModule {}
