import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { RouteEntity } from './route.entity';
import { PackageEntity } from '../packages/package.entity';
import { StationEntity } from '../stations/stations.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RouteEntity,
      PackageEntity,
      StationEntity,
    ]),
  ],
  controllers: [RoutesController],
  providers: [RoutesService],
})
export class RoutesModule {}
