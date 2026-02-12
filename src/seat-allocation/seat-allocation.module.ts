import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeatAllocationEntity } from './seat-allocation.entity';
import { SeatEntity } from '../seats/seat.entity';
import { TrainEntity } from '../trains/train.entity';

import { SeatAllocationService } from './seat-allocation.service';
import { SeatAllocationController } from './seat-allocation.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SeatAllocationEntity,
      SeatEntity,
      TrainEntity,
    ]),
  ],
  controllers: [SeatAllocationController],
  providers: [SeatAllocationService],
})
export class SeatAllocationModule {}
