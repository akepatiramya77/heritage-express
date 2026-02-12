import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { SeatEntity } from './seat.entity';
import { TrainCoachEntity } from '../train-coaches/train-coach.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SeatEntity, TrainCoachEntity])],
  providers: [SeatsService],
  controllers: [SeatsController],
  exports: [SeatsService],
})
export class SeatsModule {}
